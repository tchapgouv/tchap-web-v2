/*
Copyright 2019 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import {_t} from "../../../../../languageHandler";
import ProfileSettings from "../../ProfileSettings";
import {ShowEmailAddresses} from "../../EmailAddresses";
import Field from "../../../elements/Field";
import * as languageHandler from "../../../../../languageHandler";
import {SettingLevel} from "../../../../../settings/SettingsStore";
import SettingsStore from "../../../../../settings/SettingsStore";
import LanguageDropdown from "../../../elements/LanguageDropdown";
import AccessibleButton from "../../../elements/AccessibleButton";
import DeactivateAccountDialog from "../../../dialogs/DeactivateAccountDialog";
import LabelledToggleSwitch from "../../../elements/LabelledToggleSwitch";
import MatrixClientPeg from "../../../../../MatrixClientPeg";
import Tchap from '../../../../../Tchap';
const PlatformPeg = require("../../../../../PlatformPeg");
const sdk = require('../../../../..');
const Modal = require("../../../../../Modal");
const dis = require("../../../../../dispatcher");

export default class GeneralUserSettingsTab extends React.Component {
    constructor() {
        super();

        const accountData = MatrixClientPeg.get().getAccountData('im.vector.hide_profile');
        const redList = accountData ? accountData.event.content.hide_profile : false;
        this.state = {
            language: languageHandler.getCurrentLanguage(),
            theme: SettingsStore.getValueAt(SettingLevel.ACCOUNT, "theme"),
            redList: redList,
        };
    }

    _onLanguageChange = (newLanguage) => {
        if (this.state.language === newLanguage) return;

        SettingsStore.setValue("language", null, SettingLevel.DEVICE, newLanguage);
        this.setState({language: newLanguage});
        PlatformPeg.get().reload();
    };

    _onThemeChange = (e) => {
        const newTheme = e.target.value;
        if (this.state.theme === newTheme) return;

        SettingsStore.setValue("theme", null, SettingLevel.ACCOUNT, newTheme);
        this.setState({theme: newTheme});
        dis.dispatch({action: 'set_theme', value: newTheme});
    };

    _onPasswordChangeError = (err) => {
        // TODO: Figure out a design that doesn't involve replacing the current dialog
        let errMsg = err.error || "";
        if (err.httpStatus === 403) {
            errMsg = _t("Failed to change password. Is your password correct?");
        } else if (err.httpStatus) {
            errMsg += ` (HTTP status ${err.httpStatus})`;
        }
        const ErrorDialog = sdk.getComponent("dialogs.ErrorDialog");
        console.error("Failed to change password: " + errMsg);
        Modal.createTrackedDialog('Failed to change password', '', ErrorDialog, {
            title: _t("Error"),
            description: errMsg,
        });
    };

    _onPasswordChanged = () => {
        // TODO: Figure out a design that doesn't involve replacing the current dialog
        const ErrorDialog = sdk.getComponent("dialogs.ErrorDialog");
        Modal.createTrackedDialog('Password changed', '', ErrorDialog, {
            title: _t("Success"),
            description: _t(
                "Your password was successfully changed. You will not receive " +
                "push notifications on other devices until you log back in to them",
            ) + ".",
        });
    };

    // :TCHAP: redlist feature
    _onRedlistOptionChange = async () => {
        try {
            const redlistChecked = this.state.redList;
            if (Tchap.isCurrentUserExtern() && redlistChecked) {
                const QuestionDialog = sdk.getComponent("dialogs.QuestionDialog");
                Modal.createTrackedDialog('Redlist disabled', '', QuestionDialog, {
                    title: _t("Register my account on the red list"),
                    description: _t("To disable this option, you must accept that your email address is visible to the other users."),
                    button: _t("Accept"),
                    onFinished: async (proceed) => {
                        if (proceed) {
                            await MatrixClientPeg.get().setAccountData('im.vector.hide_profile', {hide_profile: !redlistChecked});
                            this.setState({redList: !redlistChecked});
                        } else {
                            this.setState({redList: redlistChecked});
                        }
                    },
                });
            } else {
                await MatrixClientPeg.get().setAccountData('im.vector.hide_profile', {hide_profile: !redlistChecked});
                this.setState({redList: !redlistChecked});
            }
        } catch (err) {
            console.error("Error setting AccountData 'im.vector.hide_profile': " + err);
        }
    };

    _onDeactivateClicked = () => {
        Modal.createTrackedDialog('Deactivate Account', '', DeactivateAccountDialog, {});
    };

    _renderProfileSection() {
        return (
            <div className="mx_SettingsTab_section">
                <span className="mx_SettingsTab_subheading">{_t("Profile")}</span>
                <ProfileSettings />
            </div>
        );
    }

    _renderAccountSection() {
        const ChangePassword = sdk.getComponent("views.settings.ChangePassword");
        const redListOption = (
            <span>
                <LabelledToggleSwitch value={this.state.redList}
                    onChange={this._onRedlistOptionChange}
                    label={_t('Register my account on the red list')} />
                <p className="mx_SettingsTab_subsectionText">
                ({_t("Other users will not be able to discover my account on their searches")})
                </p>
                <br />
            </span>
        );

        const passwordChangeForm = (
            <ChangePassword
                className="mx_GeneralUserSettingsTab_changePassword"
                rowClassName=""
                buttonKind="primary"
                onError={this._onPasswordChangeError}
                onFinished={this._onPasswordChanged} />
        );

        return (
            <div className="mx_SettingsTab_section mx_GeneralUserSettingsTab_accountSection">
                <span className="mx_SettingsTab_subheading">{_t("Account")}</span>
                {redListOption}
                <p className="mx_SettingsTab_subsectionText">
                    {_t("Set a new account password...")}
                    <img className="tc_PasswordHelper" src={require('../../../../../../res/img/question_mark.svg')}
                         width={25} height={25}
                         title={ _t("Your password must include a lower-case letter, an upper-case letter, a number and a symbol and be at a minimum 8 characters in length.") } alt={""} />
                </p>
                {passwordChangeForm}

                <span className="mx_SettingsTab_subheading">{_t("Email addresses")}</span>

                <ShowEmailAddresses />

            </div>
        );
    }

    _renderLanguageSection() {
        // TODO: Convert to new-styled Field
        return (
            <div className="mx_SettingsTab_section">
                <span className="mx_SettingsTab_subheading">{_t("Language and region")}</span>
                <LanguageDropdown className="mx_GeneralUserSettingsTab_languageInput"
                                  onOptionChange={this._onLanguageChange} value={this.state.language} />
            </div>
        );
    }

    _renderThemeSection() {
        const SettingsFlag = sdk.getComponent("views.elements.SettingsFlag");
        return (
            <div className="mx_SettingsTab_section mx_GeneralUserSettingsTab_themeSection">
                <span className="mx_SettingsTab_subheading">{_t("Theme")}</span>
                <Field id="theme" label={_t("Theme")} element="select" disabled={true}
                       value={this.state.theme} onChange={this._onThemeChange}>
                    <option value="tchap">{_t("Tchap theme")}</option>
                    <option value="light">{_t("Light theme")}</option>
                    <option value="dark">{_t("Dark theme")}</option>
                </Field>
                <SettingsFlag name="useCompactLayout" level={SettingLevel.ACCOUNT} />
            </div>
        );
    }

    _renderManagementSection() {
        // TODO: Improve warning text for account deactivation
        return (
            <div className="mx_SettingsTab_section">
                <span className="mx_SettingsTab_subheading">{_t("Account management")}</span>
                <span className="mx_SettingsTab_subsectionText">
                    {_t("Deactivating your account is a permanent action - be careful!")}
                </span>
                <AccessibleButton onClick={this._onDeactivateClicked} kind="danger">
                    {_t("Deactivate Account")}
                </AccessibleButton>
            </div>
        );
    }

    render() {
        return (
            <div className="mx_SettingsTab">
                <div className="mx_SettingsTab_heading">{_t("General")}</div>
                {this._renderProfileSection()}
                {this._renderAccountSection()}
                {this._renderLanguageSection()}
                {this._renderThemeSection()}
                {this._renderManagementSection()}
            </div>
        );
    }
}
