/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import usePortal from 'react-cool-portal';
import { FormatTime } from '../../utils/FormatTime';
import ToolTip from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';
import SongThumb from '../../components/SongThumb';
import { Moment } from '../../utils/Moment';
import { Link } from 'react-router-dom';

function NewRelease({ songData, songSrc, typeLength }) {
    const { Portal, show } = usePortal({
        defaultShow: false,
    });

    const [value, setValue] = useState();
    const [dataType, setDataType] = useState();
    const [srcType, setSrcType] = useState();

    useEffect(() => {
        if (songData) {
            setDataType(songData.slice(0, typeLength[0]));
            setSrcType(songSrc.slice(0, typeLength[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songData]);

    const handleClickGenre = (e) => {
        const genreBtns = document.querySelectorAll('.genre-select button');
        for (const btn of genreBtns) {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
            }
            if (e.target.value === 'all') {
                setDataType(songData.slice(0, typeLength[0]));
                setSrcType(songSrc.slice(0, typeLength[0]));
            } else if (e.target.value === 'vPop') {
                setDataType(songData.slice(typeLength[0], typeLength[0] + typeLength[1]));
                setSrcType(songSrc.slice(typeLength[0], typeLength[0] + typeLength[1]));
            } else {
                setDataType(
                    songData.slice(typeLength[0] + typeLength[1], typeLength[0] + typeLength[1] + typeLength[2]),
                );
                setSrcType(songSrc.slice(typeLength[0] + typeLength[1], typeLength[0] + typeLength[1] + typeLength[2]));
            }
        }
        e.target.classList.add('active');
    };

    if (!songData) {
        return null;
    }

    return (
        <div className="osx-section osx-new-release-section channel-section pad-0">
            <h3 className="osx-section-title title is-2">
                Mới phát hành
                <a className="discovery-btn" href="/new-release/song?filter=all">
                    Tất cả <i className="icon ic-go-right"></i>
                </a>
            </h3>
            <div className="genre-select">
                <button value="all" className="osx-btn active button" onClick={handleClickGenre} tabIndex="0">
                    Tất cả
                </button>
                <button value="vPop" className="osx-btn button" onClick={handleClickGenre} tabIndex="0">
                    Việt Nam
                </button>
                <button value="others" className="osx-btn button" onClick={handleClickGenre} tabIndex="0">
                    Quốc tế
                </button>
            </div>
            <div className="columns is-multiline">
                {[...Array(3)].map((_, colIndex) => (
                    <div
                        key={colIndex}
                        className="column mar-b-0 is-fullhd-4 is-widescreen-4 is-desktop-4 is-touch-6 is-tablet-6"
                    >
                        <div className="list">
                            {!dataType
                                ? null
                                : dataType
                                      .slice(0, 12)
                                      .filter((_, index) => index % 3 === colIndex)
                                      .map((item, i) => (
                                          <div
                                              key={i}
                                              className={`list-item hide-right media-item hide-right full-left ${
                                                  srcType[i * 3 + colIndex] ? '' : 'is-vip'
                                              }`}
                                          >
                                              <div className="media">
                                                  <div className="media-left">
                                                      <SongThumb
                                                          imgSize="60x60"
                                                          src={item.thumbnail}
                                                          songId={item.encodeId}
                                                          isVip={srcType[i * 3 + colIndex] ? false : true}
                                                      />
                                                      <div className="card-info">
                                                          <div className="title-wrapper">
                                                              <span className="item-title title">
                                                                  <span>
                                                                      <span>
                                                                          <span>{item.title}</span>
                                                                      </span>
                                                                      <span
                                                                          style={{
                                                                              position: 'fixed',
                                                                              visibility: 'hidden',
                                                                              top: '0px',
                                                                              left: '0px',
                                                                          }}
                                                                      ></span>
                                                                  </span>
                                                                  {srcType[i * 3 + colIndex] ? (
                                                                      ''
                                                                  ) : (
                                                                      <i className="icon ic- z-ic-svg ic-svg-vip-label"></i>
                                                                  )}
                                                              </span>
                                                          </div>
                                                          <h3 className="is-one-line is-truncate subtitle">
                                                              {item.artists.map((artist, i) =>
                                                                  i === item.artists.length - 1 ? (
                                                                      <Link
                                                                          key={i}
                                                                          className="is-ghost"
                                                                          to={artist.link}
                                                                      >
                                                                          {artist.name}
                                                                      </Link>
                                                                  ) : (
                                                                      <Fragment key={i}>
                                                                          <Link className="is-ghost" to={artist.link}>
                                                                              {artist.name}
                                                                          </Link>
                                                                          ,{' '}
                                                                      </Fragment>
                                                                  ),
                                                              )}
                                                          </h3>
                                                          <div className="time-release">
                                                              <span>{Moment(item.releaseDate)}</span>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="media-right">
                                                      <div className="hover-items">
                                                          <div className="level">
                                                              <div className="level-item">
                                                                  <button
                                                                      className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                      tabIndex="0"
                                                                  >
                                                                      <i className="icon ic-mv"></i>
                                                                  </button>
                                                              </div>
                                                              <div className="level-item">
                                                                  <button
                                                                      className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                      tabIndex="0"
                                                                  >
                                                                      <i className="icon ic-karaoke"></i>
                                                                  </button>
                                                              </div>
                                                              <div className="level-item">
                                                                  <button
                                                                      className="osx-btn osx-tooltip-btn animation-like undefined active is-hover-circle button"
                                                                      tabIndex="0"
                                                                  >
                                                                      <i className="icon ic-like"></i>
                                                                      <i className="icon ic-like-full"></i>
                                                                  </button>
                                                              </div>
                                                              <div className="level-item">
                                                                  <ToolTip content="Khác">
                                                                      <button
                                                                          onClick={(e) => {
                                                                              setValue(e.target.getAttribute('value'));
                                                                              show();
                                                                          }}
                                                                          className="osx-btn osx-tooltip-btn is-hover-circle button"
                                                                          tabIndex="0"
                                                                      >
                                                                          <i
                                                                              value={i * 3 + colIndex}
                                                                              className="icon ic-more"
                                                                          ></i>
                                                                      </button>
                                                                  </ToolTip>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="action-items">
                                                          <div className="level">
                                                              <div className="level-item">
                                                                  <button
                                                                      className="osx-btn osx-tooltip-btn animation-like undefined active is-hover-circle button"
                                                                      tabIndex="0"
                                                                  >
                                                                      <i className="icon ic-like"></i>
                                                                      <i className="icon ic-like-full"></i>
                                                                  </button>
                                                              </div>
                                                              <div className="level-item duration">
                                                                  {FormatTime(item.duration)}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))}
                        </div>
                    </div>
                ))}
            </div>
            <Portal>
                {!value ? null : (
                    <div className="osx-portal" style={{ left: '655px', top: '41px' }}>
                        <div className="osx-contextmenu song-menu">
                            <div className="menu">
                                <div>
                                    <Tippy
                                        offset={[150, 0]}
                                        interactive
                                        render={(attrs) => (
                                            <div
                                                {...attrs}
                                                className="submenu-content"
                                                style={{
                                                    padding: '0',
                                                }}
                                            >
                                                <div className="song-info-submenu">
                                                    <div className="item">
                                                        <h3 className="subtitle">Nghệ sĩ</h3>
                                                        <div className="content">
                                                            {dataType[value].artists.map((artist, i) =>
                                                                i === dataType[value].artists.length - 1 ? (
                                                                    <Link key={i} className="is-ghost" to={artist.link}>
                                                                        {artist.name}
                                                                    </Link>
                                                                ) : (
                                                                    <Fragment key={i}>
                                                                        <Link className="is-ghost" to={artist.link}>
                                                                            {artist.name}
                                                                        </Link>
                                                                        ,{' '}
                                                                    </Fragment>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <h3 className="subtitle">Album</h3>
                                                        <div className="content">
                                                            <a className="" href={dataType[value].album.link}>
                                                                {dataType[value].album.title}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <h3 className="subtitle">Thể loại</h3>
                                                        <div className="content">
                                                            {dataType[value].genres.map((genre, i) =>
                                                                i === dataType[value].genres.length - 1 ? (
                                                                    <a
                                                                        key={i}
                                                                        className=""
                                                                        href={genre.link}
                                                                        title={genre.name}
                                                                    >
                                                                        {genre.name}
                                                                    </a>
                                                                ) : (
                                                                    <Fragment key={i}>
                                                                        <a
                                                                            className=""
                                                                            href={genre.link}
                                                                            title={genre.name}
                                                                        >
                                                                            {genre.name}
                                                                        </a>
                                                                        ,{' '}
                                                                    </Fragment>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    >
                                        <ul className="menu-list">
                                            <div className="menu-list--submenu">
                                                <div className="media song-info-menu">
                                                    <div className="media-left">
                                                        <figure className="image is-40x40">
                                                            <img src={dataType[value].thumbnail} alt="" />
                                                        </figure>
                                                    </div>
                                                    <div className="is-w-150 media-content">
                                                        <a>
                                                            <div className="title-wrapper">
                                                                <span className="item-title title">
                                                                    <span>
                                                                        <span>
                                                                            <span>{dataType[value].title}</span>
                                                                        </span>
                                                                        <span
                                                                            style={{
                                                                                position: 'fixed',
                                                                                visibility: 'hidden',
                                                                                top: '0px',
                                                                                left: '0px',
                                                                            }}
                                                                        ></span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                        <div className="song-stats">
                                                            <div className="stat-item">
                                                                <i className="icon ic-like"></i>
                                                                <span>
                                                                    {dataType[value].like > 1000
                                                                        ? Math.floor(dataType[value].like / 1000) + 'K'
                                                                        : dataType[value].like}
                                                                </span>
                                                            </div>
                                                            <div className="stat-item">
                                                                <i className="icon ic-view"></i>
                                                                <span>
                                                                    {dataType[value].listen > 1000
                                                                        ? Math.floor(dataType[value].listen / 1000) +
                                                                          'K'
                                                                        : dataType[value].listen}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </Tippy>
                                </div>
                                <ul className="menu-list">
                                    <div className="group-button-menu">
                                        <div className="group-button-list">
                                            <button className="osx-btn button">
                                                <i className="icon ic-download"></i>
                                                <span>Tải xuống</span>
                                            </button>
                                            <button className="osx-btn button" tabIndex="0">
                                                <i className="icon ic-16-Lyric"></i>
                                                <span>Lời bài hát</span>
                                            </button>
                                            <span className="osx-btn button">
                                                <i className="icon ic-denial"></i>
                                                <span>Chặn</span>
                                            </span>
                                        </div>
                                    </div>
                                </ul>
                                <ul style={{ paddingBottom: '5px' }} className="menu-list">
                                    <li>
                                        <button className="osx-btn button" tabIndex="0">
                                            <i className="icon ic-like"></i>
                                            <span>Thêm vào thư viện</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="osx-btn button" tabIndex="0">
                                            <i className="icon ic-add-play-now"></i>
                                            <span>Thêm vào danh sách phát</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="osx-btn button" tabIndex="0">
                                            <i className="icon ic-play-next"></i>
                                            <span>Phát tiếp theo</span>
                                        </button>
                                    </li>
                                    <div>
                                        <Tippy
                                            interactive
                                            offset={[150, -37]}
                                            render={(attrs) => (
                                                <div {...attrs} className="menu add-playlist-content submenu-content">
                                                    <ul className="menu-list">
                                                        <li className="search-box">
                                                            <input className="input" placeholder="Tìm playlist" />
                                                        </li>
                                                        <li className="mar-t-10">
                                                            <button className="osx-btn button" tabIndex="0">
                                                                <i className="icon ic- z-ic-svg ic-svg-add"></i>
                                                                <span>Tạo playlist mới</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <div className="playlist-container">
                                                        <div className="top-shadow "></div>
                                                        <div className="content">
                                                            <div
                                                                style={{
                                                                    position: 'relative',
                                                                    overflow: 'hidden',
                                                                    width: '100%',
                                                                    height: '100%',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        inset: '0px',
                                                                        overflow: 'hidden scroll',
                                                                        marginRight: '-6px',
                                                                        marginBottom: '0px',
                                                                    }}
                                                                >
                                                                    <ul className="menu-list">
                                                                        <li>
                                                                            <button
                                                                                className="osx-btn button"
                                                                                tabIndex="0"
                                                                            >
                                                                                <i className="icon ic-list-music"></i>
                                                                                <span>MP</span>
                                                                            </button>
                                                                        </li>
                                                                        <li>
                                                                            <button
                                                                                className="osx-btn button"
                                                                                tabIndex="0"
                                                                            >
                                                                                <i className="icon ic-list-music"></i>
                                                                                <span>noname</span>
                                                                            </button>
                                                                        </li>
                                                                        <li>
                                                                            <button
                                                                                className="osx-btn button"
                                                                                tabIndex="0"
                                                                            >
                                                                                <i className="icon ic-list-music"></i>
                                                                                <span>My love music</span>
                                                                            </button>
                                                                        </li>
                                                                        <li>
                                                                            <button
                                                                                className="osx-btn button"
                                                                                tabIndex="0"
                                                                            >
                                                                                <i className="icon ic-list-music"></i>
                                                                                <span>Binz, Khói,...</span>
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div
                                                                    className="track-horizontal"
                                                                    style={{
                                                                        position: 'absolute',
                                                                        height: '6px',
                                                                        transition: 'opacity 200ms ease 0s',
                                                                        opacity: '0',
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            position: 'relative',
                                                                            display: 'block',
                                                                            height: '100%',
                                                                            cursor: 'pointer',
                                                                            borderRadius: 'inherit',
                                                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                                            width: '0px',
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                                <div
                                                                    className="track-vertical"
                                                                    style={{
                                                                        position: 'absolute',
                                                                        width: '4px',
                                                                        transition: 'opacity 200ms ease 0s',
                                                                        opacity: '0',
                                                                        right: '2px',
                                                                        top: '2px',
                                                                        bottom: '2px',
                                                                        zIndex: '100',
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="thumb-vertical"
                                                                        style={{
                                                                            position: 'relative',
                                                                            display: 'block',
                                                                            width: '100%',
                                                                            height: '0px',
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <li>
                                                <div className="menu-list--submenu">
                                                    <button className="osx-btn button" tabIndex="0">
                                                        <i className="icon ic-16-Add"></i>
                                                        <span>Thêm vào playlist</span>
                                                        <i className="icon ic-go-right"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        </Tippy>
                                    </div>
                                    <li>
                                        <button className="osx-btn button" tabIndex="0">
                                            <i className="icon ic-karaoke"></i>
                                            <span>Phát cùng lời bài hát</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="osx-btn button" tabIndex="0">
                                            <i className="icon ic-comment"></i>
                                            <span>Bình luận</span>
                                            {dataType[value].comment > 0 ? <span className="comment-badge"></span> : ''}
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
                )}
            </Portal>
        </div>
    );
}

export default NewRelease;
