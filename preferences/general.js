'use strict';
const {Adw, GLib, GObject, Gio} = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Driver = Me.imports.lib.driver;
const gettextDomain = Me.metadata['gettext-domain'];
const Gettext = imports.gettext.domain(gettextDomain);
const _ = Gettext.gettext;

function runInstaller() {
    Driver.runInstaller();
}

function runUpdater() {
    Driver.runUpdater();
}

function runUninstaller() {
    Driver.runUninstaller();
}

var General = GObject.registerClass({
    GTypeName: 'BHC_General',
    Template: `file://${GLib.build_filenamev([Me.path, 'ui', 'general.ui'])}`,
    InternalChildren: [
        'icon_style_mode_row',
        'icon_style_mode',
        'show_system_indicator',
        'show_notifications',
        'service_installer',
        'install_service',
        'install_service_button',
    ],
}, class General extends Adw.PreferencesPage {
    constructor(settings) {
        super({});
        this.type = settings.get_int('device-type');
        this._iconModeSensitiveCheck(settings);
        if (settings.get_boolean('root-mode')) {
            this._service_installer.visible = true;
            this._updateInstallationLabelIcon(settings);
        } else {
            this._service_installer.visible = false;
        }

        settings.bind(
            'icon-style-type',
            this._icon_style_mode,
            'selected',
            Gio.SettingsBindFlags.DEFAULT
        );

        settings.bind(
            'show-system-indicator',
            this._show_system_indicator,
            'active',
            Gio.SettingsBindFlags.DEFAULT
        );

        settings.bind(
            'show-notifications',
            this._show_notifications,
            'active',
            Gio.SettingsBindFlags.DEFAULT
        );

        this._install_service.connect('clicked', () => {
            const installType = settings.get_int('install-service');
            switch (installType) {
                case 0:
                    runUninstaller();
                    break;
                case 1:
                    runInstaller();
                    break;
                case 2:
                    runUpdater();
                    break;
            }
        });

        settings.connect('changed::install-service', () => {
            this._updateInstallationLabelIcon(settings);
        });

        settings.connect('changed::default-threshold', () => {
            this._iconModeSensitiveCheck(settings);
        });
        if (Driver.deviceInfo[this.type][1] === '1') {
            settings.connect('changed::default-threshold2', () => {
                this._iconModeSensitiveCheck(settings);
            });
        }
    }

    _iconModeSensitiveCheck(settings) {
        if (!settings.get_boolean('default-threshold')) {
            this._icon_style_mode_row.sensitive = false;
            settings.set_int('icon-style-type', 1);
        } else if (!settings.get_boolean('default-threshold2') && (Driver.deviceInfo[this.type][1] === '1')) {
            this._icon_style_mode_row.sensitive = false;
            settings.set_int('icon-style-type', 1);
        } else {
            this._icon_style_mode_row.sensitive = true;
        }
    }

    _updateInstallationLabelIcon(settings) {
        const installType = settings.get_int('install-service');
        switch (installType) {
            case 0:
                this._install_service_button.set_label(_('Remove'));
                this._install_service_button.set_icon_name('user-trash-symbolic');
                break;
            case 1:
                this._install_service_button.set_label(_('Install'));
                this._install_service_button.set_icon_name('emblem-system-symbolic');
                break;
            case 2:
                this._install_service_button.set_label(_('Update'));
                this._install_service_button.set_icon_name('software-update-available-symbolic');
                break;
        }
    }
});
