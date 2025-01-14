'use strict';
import GLib from 'gi://GLib';
import * as DeviceList from './deviceList.js';
import * as Helper from './helper.js';
import * as Notifier from './notifier.js';
import * as TPanel from './thresholdPanel.js';

const {execCheck} = Helper;

export class IntializeDriver {
    constructor(settings, extensionObject) {
        this._extensionObject = extensionObject;
        this._settings = settings;
        this._dir = extensionObject.dir;
        this._currentDevice = null;
        this._thresholdPanel = null;
        this._installationCheckCompleted = false;
        this._notifier = new Notifier.Notify(settings, extensionObject);

        this._settings.connectObject(
            'changed::polkit-installation-changed', (_settings = this._settings) => {
                if (this._installationCheckCompleted) {
                    const installType = _settings.get_string('polkit-status');
                    if (installType === 'not-installed')
                        this._runInstaller();
                    else if (installType === 'installed')
                        this._runUninstaller();
                    else if (installType === 'need-update')
                        this._runUpdater();
                }
            },
            this
        );
        this._checkCompatibility();
    }

    async _runInstallerScript(action) {
        const user = GLib.get_user_name();
        const argv = [
            'pkexec',
            this._dir.get_child('tool').get_child('installer.sh').get_path(),
            '--tool-user',
            user,
            action,
        ];
        const [status, output] = await execCheck(argv);
        log(`Battery Health Charging: ${output}`);
        return status;
    }

    async _runInstaller() {
        const status = await this._runInstallerScript('install');
        if (status === 0) {
            this._settings.set_string('polkit-status', 'installed');
            this._notifier.notifyPolkitInstallationSuccessful();
        }
    }

    async _runUpdater() {
        const status = await this._runInstallerScript('update');
        if (status === 0) {
            this._settings.set_string('polkit-status', 'installed');
            this._notifier.notifyPolkitUpdateSuccessful();
        }
    }

    async _runUninstaller() {
        const status = await this._runInstallerScript('uninstall');
        if (status === 0) {
            this._settings.set_string('polkit-status', 'not-installed');
            this._notifier.notifyUnInstallationSuccessful();
        }
    }

    async _checkInstallation() {
        const user = GLib.get_user_name();
        const ctlPath = GLib.find_program_in_path(`batteryhealthchargingctl-${user}`);

        if (ctlPath === null) {
            this._settings.set_string('polkit-status', 'not-installed');
            return 2;       // Polkit not installed
        }
        this._settings.set_string('ctl-path', ctlPath);
        const resourceDir = this._dir.get_child('resources').get_path();
        const argv = ['pkexec', ctlPath, 'CHECKINSTALLATION', resourceDir, user];
        const [status] = await execCheck(argv);
        if (status === 1) {
            this._settings.set_string('polkit-status', 'need-update');
            return 1;       // Polkit Needs Update
        }
        this._settings.set_string('polkit-status', 'installed');
        return 0;       // Polkit is installed
    }

    _getCurrentDevice() {
        let device = null;
        if (this._currentDevice !== null)
            return true;

        const type = this._settings.get_int('device-type');
        if (type !== 0) {
            device = new DeviceList.deviceArray[type - 1](this._settings);
            if (device.type === type) {
                if (device.isAvailable()) {
                    this._currentDevice = device;
                    return true;
                } else {
                    this._settings.set_int('device-type', 0); // Reset device and check again.
                    this._settings.set_string('charging-mode', 'ful');
                }
            }
        }

        device = null;
        DeviceList.deviceArray.some(item => {
            device = new item(this._settings);
            if (device.isAvailable()) {
                this._currentDevice = device;
                this._settings.set_int('device-type', this._currentDevice.type);
                return true;
            } else {
                return false;
            }
        });

        if (this._currentDevice !== null) {
            log(`Battery Health Extension: Supported device found = ${this._currentDevice.name}`);
            return true;
        }
        return false;
    }

    async _checkCompatibility() {
        if (this._getCurrentDevice() === false) {
            this._notifier.notifyUnsupportedDevice();
            return;
        }

        if (this._currentDevice.deviceNeedRootPermission) {
            const installStatus = await this._checkInstallation(); // installStatus: 0 = Installed, 1 = NeedUpdate, 2 = Not-installed
            this._installationCheckCompleted = true;
            if (installStatus === 1) {
                this._notifier.notifyNeedPolkitUpdate();
                return;
            }        else if (installStatus === 2) {
                this._notifier.notifyNoPolkitInstalled();
                return;
            }
        }

        let status;
        if (this._currentDevice.deviceHaveDualBattery)
            status = await this._currentDevice.setThresholdLimitDual();
        else
            status = await this._currentDevice.setThresholdLimit(this._settings.get_string('charging-mode'));
        if (status !== 0) {
            this._notifier.notifyAnErrorOccured(this._currentDevice.name);
            return;
        }
        this._thresholdPanel = new TPanel.ThresholdPanel(this._settings, this._extensionObject, this._currentDevice, this._notifier);
    }

    destroy() {
        if (this._thresholdPanel)
            this._thresholdPanel.destroy();
        this._thresholdPanel = null;
        this._notifier.destroy();
        this._notifier = null;
        if (this._currentDevice)
            this._currentDevice.destroy();
        this._currentDevice = null;
        this._settings.disconnectObject(this);
        this._settings = null;
    }
}

