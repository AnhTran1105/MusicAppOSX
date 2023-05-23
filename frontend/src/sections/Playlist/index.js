import { useState, useEffect } from 'react';
import Card from '../../components/Card';

function Playlist({ props, sectionTitle, cardTitle, sectionLink }) {
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        setBusy(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(props)]);

    return (
        <div className="osx-section playlist-section channel-section pad-0">
            <div className="container">
                <h3 className="osx-section-title title is-2">
                    {sectionTitle}
                    {sectionLink ? (
                        <a className="discovery-btn" href={sectionLink}>
                            tất cả <i className="icon ic-go-right"></i>
                        </a>
                    ) : null}
                </h3>

                <div className="osx-carousel-wrapper">
                    <div className="osx-carousel">
                        <div className="osx-carousel__container" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                            {!isBusy && props
                                ? props.map((item, i) =>
                                      i < 5 ? (
                                          <div
                                              key={i}
                                              className="osx-carousel-item is-fullhd-20 is-widescreen-20 is-desktop-3 is-touch-3 is-tablet-3"
                                          >
                                              <div className="playlist-wrapper is-description">
                                                  <Card
                                                      imgSize="48x48"
                                                      imgSrc={item.thumbnailM}
                                                      title={item.title}
                                                      href={item.link}
                                                      sortDescription={item.sortDescription}
                                                      cardTitle={cardTitle}
                                                      artists={item.artists}
                                                  />
                                              </div>
                                          </div>
                                      ) : (
                                          ''
                                      ),
                                  )
                                : ''}
                        </div>
                        <button className="osx-btn osx-carousel-control-prev osx-disabled is-hide button" tabIndex="0">
                            <i className="icon ic-go-left"></i>
                        </button>
                        <button className="osx-btn osx-carousel-control-next osx-disabled is-hide button" tabIndex="0">
                            <i className="icon ic-go-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
