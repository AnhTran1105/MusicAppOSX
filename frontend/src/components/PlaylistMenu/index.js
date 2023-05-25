/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react';
import Tippy from '@tippyjs/react/headless';
import ToolTip from '@tippyjs/react';
import usePortal from 'react-cool-portal';

function PlaylistMenu() {
    const { Portal, show } = usePortal({
        defaultShow: false,
    });

    return (
        <Fragment>
            <ToolTip content="Khác">
                <button onClick={show} className="osx-btn osx-tooltip-btn is-hover-circle button" tabIndex="0">
                    <i className="icon ic-more"></i>
                </button>
            </ToolTip>
            <Portal>
                <div className="osx-portal" style={{ left: '466px', top: '600px' }}>
                    <div className="osx-contextmenu song-menu">
                        <div className="menu">
                            <ul style={{ paddingBottom: '5px' }} className="menu-list">
                                <li>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon ic-add-play-now"></i>
                                        <span>Thêm vào danh sách phát</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon ic-download"></i>
                                        <span>Tải xuống</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="osx-btn button" tabIndex="0">
                                        <i className="icon ic-link"></i>
                                        <span>Sao chép link</span>
                                    </button>
                                </li>
                                <div>
                                    <Tippy
                                        offset={[150, -37]}
                                        interactive
                                        render={(attrs) => (
                                            <div {...attrs} className="menu share-content submenu-content">
                                                <ul className="menu-list">
                                                    <li>
                                                        <button className="osx-btn button" tabIndex="0">
                                                            <i className="icon z-ic-svg ic-svg-fb"></i>
                                                            <span>Facebook</span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="zalo-share-button osx-btn button"
                                                            role="button"
                                                            data-href=""
                                                            data-customize="true"
                                                            data-oaid="4073327408156217288"
                                                        >
                                                            <i className="icon z-ic-svg ic-svg-zalo"></i>
                                                            Zalo
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <button className="osx-btn button" tabIndex="0">
                                                            <i className="icon ic-code"></i>
                                                            <span>Mã nhúng</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    >
                                        <li>
                                            <div className="menu-list--submenu">
                                                <button className="osx-btn button" tabIndex="0">
                                                    <i className="icon ic-share"></i>
                                                    <span>Chia sẻ</span>
                                                    <i className="icon ic-go-right"></i>
                                                </button>
                                            </div>
                                        </li>
                                    </Tippy>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </Portal>
        </Fragment>
    );
}

export default PlaylistMenu;
