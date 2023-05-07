/* eslint-disable react/jsx-no-target-blank */
// import { handlePlay } from '~/components/Controls/handlePlay';
import { Fragment, useContext } from 'react';
import { SongContext } from '../../store/SongContext';
import usePortal from 'react-cool-portal';
import ToolTip from '@tippyjs/react';

function SongThumb({ imgSize, src, alt, songId, isVip }) {
    const context = useContext(SongContext);
    const { Portal, show, hide } = usePortal({
        defaultShow: false, // The default visibility of portal, default is true
    });

    return (
        <Fragment>
            <div
                onClick={() => {
                    if (!isVip) {
                        context.setSongId(songId);
                    } else {
                        show();
                    }
                }}
                className="song-thumb"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 8px 15px' }}
            >
                <figure className={`image is-${imgSize}`}>
                    <img src={src} alt={alt} />
                </figure>
                <div className="opacity"></div>
                <div className="osx-actions-container">
                    <div className="osx-box osx-actions">
                        <ToolTip content="Thêm vào thư viện">
                            <button
                                className="osx-btn osx-tooltip-btn animation-like is-hidden active is-hover-circle button"
                                tabIndex="0"
                            >
                                <i className="icon ic-like"></i>
                                <i className="icon ic-like-full"></i>
                            </button>
                        </ToolTip>
                        <button className="osx-btn action-play button" tabIndex="0">
                            <i className="icon action-play ic-play"></i>
                        </button>
                        <ToolTip content="Khác">
                            <button className="osx-btn osx-tooltip-btn is-hidden is-hover-circle button" tabIndex="0">
                                <i className="icon ic-more"></i>
                            </button>
                        </ToolTip>
                    </div>
                </div>
            </div>
            <Portal>
                {isVip && (
                    <div className="osx-portal-modal">
                        <div className="modal is-active">
                            <div role="presentation" className="modal-background" onClick={hide}>
                                <div className="modal-content">
                                    <div className="vip-content">
                                        <ToolTip content="Đóng">
                                            <button
                                                onClick={hide}
                                                className="osx-btn osx-tooltip-btn close-btn button"
                                                tabIndex="0"
                                            >
                                                <i className="icon ic-close"></i>
                                            </button>
                                        </ToolTip>
                                        <h3 className="title">Dành cho tài khoản VIP</h3>
                                        <h3 className="subtitle">
                                            Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để nghe bài
                                            hát này.
                                        </h3>
                                        <a
                                            className="osx-btn is-yellow mar-t-25 is-fullwidth is-upper button"
                                            tabIndex="0"
                                            href="vip"
                                            target="_blank"
                                        >
                                            Nâng cấp VIP
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Portal>
        </Fragment>
    );
}

export default SongThumb;
