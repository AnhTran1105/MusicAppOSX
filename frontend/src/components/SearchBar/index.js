import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [isVisible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/tim-kiem/tat-ca?q=${searchQuery}`);
        setVisible(false);
    };

    const handleSearchSuggestions = (e) => {
        const suggestion = e.target.textContent;
        setSearchQuery(suggestion);
        navigate(`/tim-kiem/tat-ca?q=${encodeURIComponent(suggestion)}`);
        setVisible(false);
    };

    return (
        <form className="search" onSubmit={handleSearch}>
            <Tippy
                visible={isVisible}
                onClickOutside={() => setVisible(false)}
                interactive
                render={(attrs) => (
                    <ul {...attrs} className="suggest__list">
                        <div className="suggest__list--content">
                            <div className="search__title">Đề xuất cho bạn</div>
                            <div>
                                <li className="suggest__item" onClick={handleSearchSuggestions}>
                                    <i className="icon ic-trend"></i>
                                    <div className="is-oneline">cô ấy của anh ấy</div>
                                </li>
                            </div>
                            <div>
                                <li className="suggest__item" onClick={handleSearchSuggestions}>
                                    <i className="icon ic-trend"></i>
                                    <div className="is-oneline">mưa tháng sáu</div>
                                </li>
                            </div>
                            <div>
                                <li className="suggest__item" onClick={handleSearchSuggestions}>
                                    <i className="icon ic-trend"></i>
                                    <div className="is-oneline">ngày mai người ta lấy chồng</div>
                                </li>
                            </div>
                            <div>
                                <li className="suggest__item" onClick={handleSearchSuggestions}>
                                    <i className="icon ic-trend"></i>
                                    <div className="is-oneline">mật ngọt</div>
                                </li>
                            </div>
                            <div>
                                <li className="suggest__item" onClick={handleSearchSuggestions}>
                                    <i className="icon ic-trend"></i>
                                    <div className="is-oneline">một ngày chẳng nắng</div>
                                </li>
                            </div>
                            <div>
                                <li className="suggest__item" onClick={handleSearchSuggestions}>
                                    <i className="icon ic-trend"></i>
                                    <div className="is-oneline">đưa em về nhà</div>
                                </li>
                            </div>
                        </div>
                    </ul>
                )}
            >
                <div className={`search__container ${isVisible ? 'is-collapse' : ''}`}>
                    <button type="submit" className="osx-btn button" tabIndex="0">
                        <i className="icon ic-search"></i>
                    </button>
                    <div
                        onClick={() => {
                            setVisible(true);
                        }}
                        className="input-wrapper"
                    >
                        <input
                            type="text"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control z-input-placeholder"
                            placeholder="What do you want to listen?"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </Tippy>
        </form>
    );
}

export default SearchBar;
