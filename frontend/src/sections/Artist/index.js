import Card from '../../components/Card';

function Artist({ props, cardTitle, artistSection }) {
    return (
        <div className="osx-section artist-section channel-section">
            <div className="container">
                <h3 className="osx-section-title title is-2">Bạn Có Thể Thích</h3>
            </div>
            <div className="osx-carousel-wrapper">
                <div className="osx-carousel">
                    <div className="osx-carousel__container" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                        {props
                            ? props.map((item, i) =>
                                  i < 5 ? (
                                      <div
                                          key={i}
                                          className="osx-carousel-item is-fullhd-20 is-widescreen-20 is-desktop-3 is-touch-3 is-tablet-3"
                                      >
                                          <Card
                                              imgSize="48x48"
                                              imgSrc={item.thumbnailM}
                                              title={item.title}
                                              href={item.link}
                                              sortDescription={item.sortDescription}
                                              cardTitle={cardTitle}
                                              artistSection={artistSection}
                                              artists={item.artists}
                                              artistData={item}
                                          />
                                      </div>
                                  ) : (
                                      ''
                                  ),
                              )
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
    );
}

export default Artist;
