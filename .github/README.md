![Battery-Health-Charging](https://github.com/maniacx/Battery-Health-Charging/blob/main/.github/Battery-Health-Charging.gif)

Battery Health Charging extension for GNOME shell
=================================================

https://extensions.gnome.org/extension/5724/battery-health-charging/

Battery Health Charging extension sets the limit of battery charging to maximize battery health mainly for laptops that support these features.
Since users usually keep their AC adapter connected while using their laptop, the battery is often in a state of high-power (98-100%) for an extended length of time which causes a reduction in battery life. Initially, I made this for my laptop (Asus) but as of **Version 4** , the extension evolve to support several brands. Some laptops have fixed threshold, while some laptop's threshold can be customized. (See details in laptop supported). This extension detects the hardware and displays the option accordingly.

**1. Full Capacity Mode:** Battery is charged to its full capacity for longer use on battery power.(Threshold are customizable on some laptop.)

**2. Balanced Mode:** Stops charging when power is above 80% and resumes charging when power is below 75%. This mode is recommended when using the Notebook on battery power during meetings or conferences. (Threshold are customizable on some laptop. Some laptop don't feature this option.)

**3. Maximum Lifespan Mode:** Stops charging when power is above 60% and resumes charging when power is below 55%. This mode is recommended when the Notebook is always powered by AC adapter.(Threshold are customizable on some laptop. Some laptop the maximum lifespan mode is set to 80%)

## Contents
>  [**Feature**](https://github.com/maniacx/Battery-Health-Charging#features)<br>
>  [**Usage**](https://github.com/maniacx/Battery-Health-Charging#usage)<br>
>  [**Compatibility**](https://github.com/maniacx/Battery-Health-Charging#compatibility)<br>
>
>> [Asus](https://github.com/maniacx/Battery-Health-Charging#asus)<br>
>> [LG](https://github.com/maniacx/Battery-Health-Charging#lg)<br>
>> [Samsung](https://github.com/maniacx/Battery-Health-Charging#samsung)<br>
>> [Sony](https://github.com/maniacx/Battery-Health-Charging#sony)<br>
>> [Huawei](https://github.com/maniacx/Battery-Health-Charging#huawei)<br>
>> [Toshiba](https://github.com/maniacx/Battery-Health-Charging#toshiba)<br>
>> [System76](https://github.com/maniacx/Battery-Health-Charging#system76)<br>
>> [Lenovo (Ideapad, Legion)](https://github.com/maniacx/Battery-Health-Charging#lenovo-ideapad-legion)<br>
>> [Thinkpad](https://github.com/maniacx/Battery-Health-Charging#thinkpad-single-dual-battery)<br>
>> [Thinkpad (legacy tpsmapi)](https://github.com/maniacx/Battery-Health-Charging-Private#thinkpad-legacy-tpsmapi-single-dual-battery)<br>
>> [Panasonic](https://github.com/maniacx/Battery-Health-Charging#panasonic)<br>
>> [Acer](https://github.com/maniacx/Battery-Health-Charging#acer)<br>
>> [MSI](https://github.com/maniacx/Battery-Health-Charging#msi)<br>
>> [Intel QC71 (XMG, Eluktronics, Tuxedo)](https://github.com/maniacx/Battery-Health-Charging#intel-qc71-devices-xmg-eluktronics-tuxedo)<br>
>> [Tuxedo](https://github.com/maniacx/Battery-Health-Charging#tuxedo)<br>
>> [Gigabyte (Aero, Aorus)](https://github.com/maniacx/Battery-Health-Charging#gigabyte-devices-aero-aorus)<br>
>> [Dell (libsmbios)](https://github.com/maniacx/Battery-Health-Charging#dell-libsmbios)<br>
>> [Dell (Dell command configure cctk)](https://github.com/maniacx/Battery-Health-Charging#dell-dell-command-configure-cctk)<br>
>> [Apple Macbook Intel-series chip](https://github.com/maniacx/Battery-Health-Charging#apple-macbook-intel-series-chip)<br>
>> [Apple Macbook M-series chip](https://github.com/maniacx/Battery-Health-Charging#apple-macbook-m-series-chip-asahi-linux-kernel)<br>
>
>  [**Changelogs**](https://github.com/maniacx/Battery-Health-Charging#changelog)<br>
>  [**Polkit Installation**](https://github.com/maniacx/Battery-Health-Charging#polkit-installation)<br>
>  [**Translation**](https://github.com/maniacx/Battery-Health-Charging#translation)<br>
>  [**Bug / Issues /Feature Request**](https://github.com/maniacx/Battery-Health-Charging#bugsissuerequest-feature)<br>
>  [**Credits and Reference**](https://github.com/maniacx/Battery-Health-Charging#credits-and-reference)<br>
## Features
* Conflicts with other battery charging threshold controls apps / extensions / local workarounds scripts, so better to disable or remove before using this extension.
* The charging mode persists on reboot. As of **Version 4** if your device needs **privileged access** (root) to change the threshold, this extension will prompt you to install polkit script. This way the extension can change the threshold on users input and also restore it on system restarts.
* Customize threshold (only for device that support custom threshold)
* Extension Pref icon in quick settings menu. And added option in preference to remove this icon from quick setting.
* Option to choose 3 set of icons in preference.
* Shows an icon indicating current mode. And added option in preference to change index and also to disable showing icon
* Option to change behavior of systems battery indicator. When charging threshold is set and battery level reaches threshold, the default behavior in gnome is system battery indicator will display **On battery - charger unplugged/powered-off** icon and there is no way of knowing if charger is plugged and powered. Upon enabling this option, system battery indicator will display **charging** icon. Note: If this feature is not working for your laptop, kindly raise an issue with your and post the results of power supply name with the following command in terminal ```ls -l /sys/class/power_supply```

* Displays notification when threshold/mode is changed. And added option in preference to disable notification update
* Display current mode subtitles in quicksetting toggle (Gnome 44 and above). And added an option in preference to remove this subtitle.

## Usage
![Battery-Health-Charging](https://github.com/maniacx/Battery-Health-Charging/blob/main/.github/Usage.png)
![Battery-Health-Charging](https://github.com/maniacx/Battery-Health-Charging/blob/main/.github/Usage2.gif)

## Compatibility
### Asus
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default threshold values of these 3 preset modes are set at 100%, 80%, and 60%.
* Each preset threshold value can be customized between 100-80 %, 85-65 %, and 85-50 % respectively.
* This Extension supports Asus Laptop having one of the below paths.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
'/sys/class/power_supply/BAT1/charge_control_end_threshold'
'/sys/class/power_supply/BATC/charge_control_end_threshold'
'/sys/class/power_supply/BATT/charge_control_end_threshold'
```
### LG
* 2 preset Full capacity and Maximum Life Span mode set at 100% and 80%. Fixed threshold (not customizable).
* This Extension supports LG laptops having the below path.
```bash
'/sys/devices/platform/lg-laptop/battery_care_limit'
```
### Samsung
* 2 preset Full capacity and Maximum Life Span mode set at 100% and 80%(85% in some model). Fixed threshold (not customizable).
* Maximum Life Span mode is the what Samsung refers to as **smart charging mode**
* This Extension supports Samsung laptops having the below path.
```bash
'/sys/devices/platform/samsung/battery_life_extender'
```
### Sony
* 3 preset Full capacity, Balanced and Maximum Life Span mode set at 100%, 80% and 50%. Fixed threshold (not customizable).
* Balanced mode is what Sony refers to as **Battery care function 80%**
* Maximum Life Span mode is what Sony refers to as **Battery care function 50%**
* This Extension supports Sony laptops having the below path.
```bash
'/sys/devices/platform/sony-laptop/battery_care_limiter'
```
### Huawei
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default end/start threshold values of these 3 preset modes are set at 100/95%, 80/75%, and 60/55%.
* Each preset end threshold value can be customized between 100-80 %, 80-65 %, and 85-50 % respectively.
* Each preset start threshold value can be customized between is 98-75 %, 83-60 %, and 83-40 % respectively.
* The difference between end and start threshold cannot be less than 2%.
* This Extension supports Huawei laptops having the below path.
```bash
'/sys/devices/platform/huawei-wmi/charge_thresholds'
```
### Toshiba
* 2 preset Full capacity and Maximum Life Span mode set at 100% and 80%. Fixed threshold (not customizable).
* Maximum Life Span mode is what Toshiba refers to as **eco charging mode**
* Battery level should be below 80% to switch from full-capacity to max-lifespan mode.
* This Extension supports Toshiba laptops having one of the below paths.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
'/sys/class/power_supply/BAT1/charge_control_end_threshold'
```
### System76
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default end/start threshold values of these 3 preset modes are set at 100/95%, 80/75%, and 60/55%.
* Each preset end threshold value can be customized between 100-80 %, 85-65 %, and 85-50 % respectively.
* Each preset start threshold value can be customized between is 98-75 %, 83-60 %, and 83-40 % respectively.
* The difference between end and start threshold cannot be less than 2%.
* This Extension supports System76 laptops having the below path.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
'/sys/class/power_supply/BAT0/charge_control_start_threshold'
```
### Lenovo (Ideapad, Legion)
* 2 preset Full capacity and Maximum Life Span mode set at 100% and 60%(80% in some model). Fixed threshold (not customizable).
* Maximum Life Span mode is what Lenovo refers to as **conservative mode**
* This Extension supports Lenovo Ideapad Laptop having the below path
```bash
'/sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
```
### Thinkpad Single /Dual Battery
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default end/start threshold values of these 3 preset modes are set at 100/95%, 80/75%, and 60/55%.
* Each preset end threshold value can be customized between 100-80 %, 80-65 %, and 85-50 % respectively.
* Each preset start threshold value can be customized between is 98-75 %, 83-60 %, and 83-40 % respectively.
* The difference between end and start threshold cannot be less than 2%.
* This Extension supports Thinkpad laptops that have pair of below paths.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
'/sys/class/power_supply/BAT0/charge_control_start_threshold'

'/sys/class/power_supply/BAT1/charge_control_end_threshold'
'/sys/class/power_supply/BAT1/charge_control_start_threshold'
```
### Thinkpad (legacy tpsmapi) Single /Dual Battery 
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default end/start threshold values of these 3 preset modes are set at 100/95%, 80/75%, and 60/55%.
* Each preset end threshold value can be customized between 100-80 %, 80-65 %, and 85-50 % respectively.
* Each preset start threshold value can be customized between is 95-75 %, 85-60 %, and 85-40 % respectively.
* The difference between end and start threshold cannot be less than 5%.
* This Extension supports Thinkpad laptops that have pair of below paths.
```
'/sys/devices/platform/smapi/BAT0/stop_charge_thresh'
'/sys/devices/platform/smapi/BAT0/start_charge_thresh'

'/sys/devices/platform/smapi/BAT1/stop_charge_thresh'
'/sys/devices/platform/smapi/BAT1/start_charge_thresh'
```
### Panasonic
* 2 preset Full capacity and Maximum Life Span mode set at 100% and 80%(75% in some model). Fixed threshold (not customizable).
* This Extension supports Panasonic laptops having the below path.
```bash
'/sys/devices/platform/panasonic/eco_mode'
```
### Acer
* 2 preset Full capacity and Maximum Life Span modes set at 100% and 80%. Fixed threshold (not customizable).
* Maximum Life Span mode is the what Acer refers to as **Battery Limit charge**
* Depends on separate kernel module (dkms) installation https://github.com/frederik-h/acer-wmi-battery
(This kernel module is supported by a third party and I am not in any way not responsible for the kernel module installation, bugs or damages)
* This Extension supports Acer laptops having the below path.
```bash
'/sys/bus/wmi/drivers/acer-wmi-battery/health_mode'
```
### MSI
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default threshold values of these 3 preset modes are set at 100%, 80%, and 60%.
* Each preset threshold value can be customized between 100-80 %, 85-65 %, and 85-50 % respectively.
* Full capacity mode is equivalent to what Msi refers to as **Best for Mobility**
* Balanced mode is equivalent to what Msi refers to as **Balance**
* Maximum Life Span mode is equivalent to what Msi refers to as **Best for Battery**
* Depends on separate kernel module (dkms) installation https://github.com/BeardOverflow/msi-ec
(This kernel module is supported by a third party and I am not in any way not responsible for the kernel module installation, bugs, or damages)
Although the module has been submitted lately into the mainline kernel and may not be needed.
* This Extension supports MSI laptops having one of the below paths.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
```
### Intel QC71 Devices (XMG, Eluktronics, Tuxedo)
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default threshold values of these 3 preset modes are set at 100%, 80%, and 60%.
* Each preset threshold value can be customized between 100-80 %, 85-65 %, and 85-50 % respectively.
* Depends on separate kernel module (dkms) installation https://github.com/pobrn/qc71_laptop
(This kernel module is supported by a third party and I am not in any way not responsible for the kernel module installation, bugs, or damages)
* Support some model from XMG, Eluktronics, Tuxedo, etc using kernel module.
* This Extension supports qc71 laptops which have the below paths.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
```
### Tuxedo
* 2/3 preset Full capacity, Balanced and Maximum Life Span mode set at 100%, 90% and 80%. Fixed threshold (not customizable).
* Maximum Life Span mode is what Sony refers to as **Stationary**
* Depends on separate kernel module (dkms) installation https://github.com/tuxedocomputers/tuxedo-keyboard
(This kernel module is supported by a third party and I am not in any way not responsible for the kernel module installation, bugs, or damages)
* This Extension supports Tuxedo laptops having the below path.
```bash
'/sys/devices/platform/tuxedo_keyboard/charging_profile/charging_profiles_available'
'/sys/devices/platform/tuxedo_keyboard/charging_profile/charging_profile'
```
### Gigabyte Devices (Aero, Aorus)
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default threshold values of these 3 preset modes are set at 100%, 80%, and 60%.
* Each preset threshold value can be customized between 100-80 %, 85-65 %, and 85-60 % respectively.
* Depends on separate kernel module (dkms) installation https://github.com/tangalbert919/gigabyte-laptop-wmi
(This kernel module is supported by a third party and I am not in any way not responsible for the kernel module installation, bugs, or damages)
* Support some model from Aero, Aorus etc using kernel module.
* This Extension supports gigabyte laptops which have the below paths.
```bash
'/sys/devices/platform/gigabyte_laptop/charge_mode'
'/sys/devices/platform/gigabyte_laptop/charge_limit'
```
### Dell (libsmbios)
**NOTE: The Express mode may cause battery health to diminish more quickly than other modes.**
**NOTE: If both libsmbios and Dell Command Center(cctk) are installed on your laptop, an option will provide in the extension settings to choose between libsmbios and Dell Command Center. Select with package the extension should use to set charging threshold. Default is set to libsmbios**

* 5 presets Express, Adaptive, Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Express and Adaptive are fixed mode. You can find the description of Express charge mode and adaptive mode on dell [website](https://www.dell.com/support/manuals/en-us/dcpm2.1/userguide_dell-v1/configuraci%C3%B3n-de-bater%C3%ADa?guid=guid-0fbbbeff-4928-4def-89af-3d28d0a231ce&lang=en-us).
* Full Capacity Mode, Balance Mode, and Maximum Life Span mode are **custom mode** with end/start threshold values set to 100/95%, 80/75%, and 60/55%.
* Each custom mode preset end threshold value can customize between 100-80 %, 85-65 %, and 85-55 % respectively.
* Each custom mode preset start threshold value can customize between 95-75 %, 83-60 %, and 83-50 % respectively.
* Full capacity mode is equivalent to what Dell refers to as **Standard**
* Balance mode is almost equivalent to what Dell refers to as **Primarily AC**
* The difference between end and start threshold cannot be less than 5%.
* Depends on executable package **smbios-battery-ctl** which is provided by **smbios-utils** https://github.com/dell/libsmbios
(smbios-utils is third-party package and I am not in any way not responsible for installation, bugs, or damages)
* This Extension supports dell through smbios-utils package smbios-battery-ctl using following commands
```
smbios-battery-ctl --set-charging-mode express
smbios-battery-ctl --set-charging-mode adaptive
smbios-battery-ctl --set-charging-mode custom
smbios-battery-ctl --set-custom-charge-interval low high
```
### Dell (Dell command configure cctk)
**NOTE: The Express mode may cause battery health to diminish more quickly than other modes.**
**NOTE: Doesnt support changing threshold with bios password**
**NOTE: If both libsmbios and Dell Command Center(cctk) are installed on your laptop, an option will provide in the extension settings to choose between libsmbios and Dell Command Center. Select with package the extension should use to set charging threshold. Default is set to libsmbios**

* 5 presets Express, Adaptive, Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Express and Adaptive are fixed mode. You can find the description of Express charge mode and adaptive mode on dell [website](https://www.dell.com/support/manuals/en-us/dcpm2.1/userguide_dell-v1/configuraci%C3%B3n-de-bater%C3%ADa?guid=guid-0fbbbeff-4928-4def-89af-3d28d0a231ce&lang=en-us).
* Full Capacity Mode, Balance Mode, and Maximum Life Span mode are **custom mode** with end/start threshold values set to 100/95%, 80/75%, and 60/55%.
* Each custom mode preset end threshold value can customize between 100-80 %, 85-65 %, and 85-55 % respectively.
* Each custom mode preset start threshold value can customize between 95-75 %, 83-60 %, and 83-50 % respectively.
* Full capacity mode is equivalent to what Dell refers to as **Standard**
* Balance mode is almost equivalent to what Dell refers to as **Primarily AC**
* The difference between end and start threshold cannot be less than 5%.
* Depends on executable package **cctk**  provided by [dell command configure](https://www.dell.com/support/kbdoc/en-us/000178000/dell-command-configure)
(Dell command configure is third-party package and I am not in any way not responsible for installation, bugs, or damages)
* This Extension supports dell through smbios-utils package smbios-battery-ctl using following commands
```
/opt/dell/dcc/cctk --PrimaryBattChargeCfg=Express
/opt/dell/dcc/cctk --PrimaryBattChargeCfg=Adaptive
/opt/dell/dcc/cctk --PrimaryBattChargeCfg=Custom:low-high
```
### Apple Macbook Intel-series chip
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default threshold values of these 3 preset modes are set at 100%, 80%, and 60%.
* Each preset threshold value can be customized between 100-80 %, 85-65 %, and 85-50 % respectively.
* Depends on separate kernel module  (dkms) installation https://github.com/c---/applesmc-next
(This kernel module is supported by a third party and I am not in any way not responsible for the kernel module installation, bugs, or damages)
* This Extension supports Apple laptops having one of the below paths.
```bash
'/sys/class/power_supply/BAT0/charge_control_end_threshold'
```
### Apple Macbook M-series chip (Asahi Linux Kernel)
**Kernel 6.2.xxx**
* 3 presets Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default end/start threshold values of these 3 preset modes are set at 100/95%, 80/75%, and 60/55%.
* Each preset end threshold value can be customized between 100-80 %, 85-65 %, and 85-52 % respectively.
* Each preset start threshold value can be customized between is 98-75 %, 83-60 %, and 83-50 % respectively.
* The difference between end and start threshold cannot be less than 2%.

**Kernel 6.3.xxx**
* 2 preset Full capacity and Maximum Life Span mode set at 100% and 80%. Fixed threshold (not customizable).
* This Extension supports Macbooks using Asahi Linux having the below path.
```bash
'/sys/class/power_supply/macsmc-battery/charge_control_end_threshold'
'/sys/class/power_supply/macsmc-battery/charge_control_start_threshold'
```

## Changelog
### Version 28
Sep 09, 2023
* Removed unused imports

### Version 27
Sep 09, 2023
* Ported to Gnome 45

### Version 26
Sep 08, 2023
* Fixed battery2 customize threshold not rejecting values entered out of limit
* Rewrote extension for better portability of upcoming gnome release

### Version 25
Sep 06, 2023
* Fix for devices which doesn't immediately update threshold after writing. Added re-verification by reading threshold after 200ms if threshold fails verification the first time.
* Fix error for thinkpad legacy when disabling extension

### Version 24
Jul 05, 2023
* Dell: Fixed unsupported device for dell libsmbios on debian

### Version 23
Jun 10, 2023
* translation updates
* Toshiba: used upower to get battery level which is used to show/hide threshold options
* Asahi-linux: Support new implementation of charging threshold on 6.3 kernels 

### Version 22
May 31, 2023
* Italian translation contribution (Thanks dalz)
* Added additional check for detection of laptop, as dells libsmbios can be installed as dependencies on non-dell laptops (Thanks hensnenenej for debugging and report it)
* Added a settings option to choose betweem libsmbios and dell command center if both packages are installed on dell device.
* Added battery removal detection for dual battery thinkpads (untested).
* Fix threshold setting on full-capacity mode for sony laptops.
* Added a notification message if threshold fails to update.
* Added detected device name on error notifications (Helps debugging incase extension detect as wrong device)
* Removed verify threshold by readback after setting threshold as reading charging threshold is buggy on toshiba
* Remove option to change charging threshold to 80% if battery level is more than 80% on toshiba.

See [Full History](https://github.com/maniacx/Battery-Health-Charging/blob/main/.github/CHANGELOG.md)

## Polkit Installation
#### Polkit Installation: Installation/Update/Removal
* All devices require privileged permission (root) to change threshold/mode.
Therefore the extension will notify the user to install polkit from extension settings.
Installing polkit will require privileged (root) access and will need to logout and re-login.
* During the extension update, if the polkit/ctl file have change and updated, a extension with notify you to update the polkit.
* **Please remove/uninstall polkit first using this extension preferences, prior to uninstalling this extension**

## Translation
Please contribute translation.
Using Poedit / Gtranslator (Available in gnome software). Using poedit Open/create your language.po. Download the po/Battery-Health-Charging.pot file from github. Go to **Translation** and **Update from POT file** , translate and submit a pull-request to the **main** branch on github. Or raise an issue and I will upload it manaully.

## Bugs/Issue/Request feature
Please raise an [issue](https://github.com/maniacx/Battery-Health-Charging/issues) on github.

## Ratings
If the extension is working well for you, Please take the time to submit a review mentioning the brand/model of your laptop.
https://extensions.gnome.org/extension/5724/battery-health-charging/

## Credits and Reference
I made this extension for my Asus Viwobook. I have looked into codes of other extensions to create this extension. Credits to them.

Thinkpad Battery Threshold -by marcosdalvarez
https://gitlab.com/marcosdalvarez/thinkpad-battery-threshold-extension

Supergfxctl (Super Graphics Control) - Asus-linux
https://gitlab.com/asus-linux/supergfxctl

Shutdown Timer - by Deminder
https://github.com/Deminder/ShutdownTimer
For polkit resources.

Battery Indicator Icon - by Deminder
https://github.com/Deminder/battery-indicator-icon

BlurMyshell - by Aunetx
https://github.com/aunetx/blur-my-shell

Dash-to-Dock - by micheleg
https://github.com/micheleg/dash-to-dock

Caffeine - by eon 
https://github.com/eonpatapon/gnome-shell-extension-caffeine

More info about battery life on asus official site
https://www.asus.com/support/FAQ/1032726/

TLP - by linrunner
https://github.com/linrunner/TLP
For lot of resources about battery threshold.

Arch-Linux
https://wiki.archlinux.org/title/Category:Laptops

Gnome guides
https://gjs.guide/extensions/development/creating.html

Just Perfection Videos and examples
https://gitlab.com/justperfection.channel/how-to-create-a-gnome-extension-documentation/-/tree/master/Examples


Also Thanks for support: Just Perfection. Andy Holmes, mascherm, kir-93, monethass, anzigo, asant, yukina3230, Valeria, albanobattistella, teohhanhui, ai, ViBE-HU, tangalbert919, r_wraith, AbrarSL, viksok, Vistaus, sabriunal, olebole


