/*
Copyright 2018 New Vector Ltd

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
import PropTypes from 'prop-types';
import {Room, User, Group, RoomMember, MatrixEvent} from 'matrix-js-sdk';
import sdk from '../../../index';
import { _t } from '../../../languageHandler';
import QRCode from 'qrcode-react';
import {RoomPermalinkCreator, makeGroupPermalink, makeUserPermalink} from "../../../matrix-to";
import * as ContextualMenu from "../../structures/ContextualMenu";

// :TCHAP: all the social part was removed
export default class ShareDialog extends React.Component {
    static propTypes = {
        onFinished: PropTypes.func.isRequired,
        target: PropTypes.oneOfType([
            PropTypes.instanceOf(Room),
            PropTypes.instanceOf(User),
            PropTypes.instanceOf(Group),
            PropTypes.instanceOf(RoomMember),
            PropTypes.instanceOf(MatrixEvent),
        ]).isRequired,
        isExtShared: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.onCopyClick = this.onCopyClick.bind(this);
        this.onLinkSpecificEventCheckboxClick = this.onLinkSpecificEventCheckboxClick.bind(this);

        this.state = {
            // MatrixEvent defaults to share linkSpecificEvent
            linkSpecificEvent: this.props.target instanceof MatrixEvent,
        };
    }

    static _selectText(target) {
        const range = document.createRange();
        range.selectNodeContents(target);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    static onLinkClick(e) {
        e.preventDefault();
        const {target} = e;
        ShareDialog._selectText(target);
    }

    onCopyClick(e) {
        e.preventDefault();

        ShareDialog._selectText(this.refs.link);

        let successful;
        try {
            successful = document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

        const GenericTextContextMenu = sdk.getComponent('context_menus.GenericTextContextMenu');
        const buttonRect = e.target.getBoundingClientRect();

        // The window X and Y offsets are to adjust position when zoomed in to page
        const x = buttonRect.right + window.pageXOffset;
        const y = (buttonRect.top + (buttonRect.height / 2) + window.pageYOffset) - 19;
        const {close} = ContextualMenu.createMenu(GenericTextContextMenu, {
            chevronOffset: 10,
            left: x,
            top: y,
            message: successful ? _t('Copied!') : _t('Failed to copy'),
        }, false);
        // Drop a reference to this close handler for componentWillUnmount
        this.closeCopiedTooltip = e.target.onmouseleave = close;
    }

    onLinkSpecificEventCheckboxClick() {
        this.setState({
            linkSpecificEvent: !this.state.linkSpecificEvent,
        });
    }

    componentWillMount() {
        if (this.props.target instanceof Room) {
            const permalinkCreator = new RoomPermalinkCreator(this.props.target);
            permalinkCreator.load();
            this.setState({permalinkCreator});
        }
    }

    componentWillUnmount() {
        // if the Copied tooltip is open then get rid of it, there are ways to close the modal which wouldn't close
        // the tooltip otherwise, such as pressing Escape or clicking X really quickly
        if (this.closeCopiedTooltip) this.closeCopiedTooltip();
    }

    render() {
        let title;
        let matrixToUrl;

        let checkbox;

        if (this.props.target instanceof Room) {
            title = _t('Share Room');

            const events = this.props.target.getLiveTimeline().getEvents();
            if (events.length > 0) {
                checkbox = <div>
                    <input type="checkbox"
                           id="mx_ShareDialog_checkbox"
                           checked={this.state.linkSpecificEvent}
                           onClick={this.onLinkSpecificEventCheckboxClick} />
                    <label htmlFor="mx_ShareDialog_checkbox">
                        { _t('Link to most recent message') }
                    </label>
                </div>;
            }

            if (this.state.linkSpecificEvent) {
                matrixToUrl = this.state.permalinkCreator.forEvent(events[events.length - 1].getId());
            } else {
                matrixToUrl = this.state.permalinkCreator.forRoom();
            }
        } else if (this.props.target instanceof User || this.props.target instanceof RoomMember) {
            title = _t('Share User');
            matrixToUrl = makeUserPermalink(this.props.target.userId);
        } else if (this.props.target instanceof Group) {
            title = _t('Share Community');
            matrixToUrl = makeGroupPermalink(this.props.target.groupId);
        } else if (this.props.target instanceof MatrixEvent) {
            title = _t('Share Room Message');
            checkbox = <div>
                <input type="checkbox"
                       id="mx_ShareDialog_checkbox"
                       checked={this.state.linkSpecificEvent}
                       onClick={this.onLinkSpecificEventCheckboxClick} />
                <label htmlFor="mx_ShareDialog_checkbox">
                    { _t('Link to selected message') }
                </label>
            </div>;

            if (this.state.linkSpecificEvent) {
                matrixToUrl = this.props.permalinkCreator.forEvent(this.props.target.getId());
            } else {
                matrixToUrl = this.props.permalinkCreator.forRoom();
            }
        }
        const encodedUrl = encodeURIComponent(matrixToUrl);

        let warningSharingExtUI;
        if (this.props.isExtShared) {
            warningSharingExtUI = (
                <div className="tc_ExternSharing_warning">
                    <img src={require("../../../../res/img/tchap/warning.svg")} width="16" height="16"  alt="warning" />
                    <span>{ _t("An invitation is still required for externs, although link access is enabled.") }</span>
                </div>
            );
        }

        const BaseDialog = sdk.getComponent('views.dialogs.BaseDialog');
        return <BaseDialog title={title}
                           className='mx_ShareDialog'
                           contentId='mx_Dialog_content'
                           onFinished={this.props.onFinished}
        >
            { warningSharingExtUI }
            <div className="mx_ShareDialog_content">
                <div className="mx_ShareDialog_matrixto">
                    <a ref="link"
                       href={matrixToUrl}
                       onClick={ShareDialog.onLinkClick}
                       className="mx_ShareDialog_matrixto_link"
                    >
                        { matrixToUrl }
                    </a>
                    <a href={matrixToUrl} className="mx_ShareDialog_matrixto_copy" onClick={this.onCopyClick}>
                        { _t('COPY') }
                        <div>&nbsp;</div>
                    </a>
                </div>
                { checkbox }
                <br />
                <details>
                    <summary>{_t("Share")}</summary>
                    <p>
                        <div className="mx_ShareDialog_qrcode_container">
                            <QRCode value={matrixToUrl} size={256} logoWidth={48} logo={require("../../../../res/img/matrix-m.svg")} />
                        </div>
                        <div className="mx_ShareDialog_social_container">
                            <a rel="noopener" target="_blank" key="email"
                               name="email"
                               href={`mailto:?body=${encodedUrl}`}
                               className="mx_ShareDialog_social_icon">
                                <img src={require("../../../../res/img/social/email-1.png")} alt="email" height={64} width={64} />
                            </a>
                        </div>
                    </p>
                </details>
            </div>
        </BaseDialog>;
    }
}
