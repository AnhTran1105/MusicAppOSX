import { Link } from 'react-router-dom';
import Card from '../../components/Card';

function MV({ props, cardTitle, sectionLink, sectionTitle, MvSection = true, artistImg }) {
    return (
        <div className="osx-section">
            <div className="container mar-t-30 channel-section">
                <h3 className="osx-section-title title is-2">
                    {sectionTitle}
                    <Link className="discovery-btn" to={sectionLink}>
                        Tất cả <i className="icon ic-go-right"></i>
                    </Link>
                </h3>
                <div className="osx-carousel-wrapper">
                    <div className="osx-carousel">
                        <div className="osx-carousel__container" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                            {props
                                ? props.map((item, i) => (
                                      <div
                                          key={i}
                                          className="osx-carousel-item is-fullhd-4 is-widescreen-4 is-desktop-4 is-touch-4 is-tablet-6"
                                      >
                                          <Card
                                              imgSize="48x48"
                                              imgSrc={item.thumbnailM}
                                              title={item.title}
                                              href={item.link}
                                              sortDescription={item.sortDescription}
                                              cardTitle={cardTitle}
                                              artists={item.artists}
                                              artistData={item}
                                              MvSection={MvSection}
                                              MvData={item}
                                              artistImg={artistImg ? artistImg : item.thumbnail}
                                          />
                                      </div>
                                  ))
                                : ''}
                        </div>
                    </div>
                    <button className="osx-btn osx-carousel-control-prev osx-disabled is-hide button" tabIndex="0">
                        <i className="icon ic-go-left"></i>
                    </button>
                    <button className="osx-btn osx-carousel-control-next is-hide button" tabIndex="0">
                        <i className="icon ic-go-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MV;
