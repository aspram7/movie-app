import "./style.scss";

const menuList = [
  { id: 1, title: "Search", icon: "ICON - Search.png" },
  { id: 2, title: "Home", icon: "Group 46.png" },
  { id: 3, title: "TV Shows", icon: "Group 56.png" },
  { id: 4, title: "Movies", icon: "Group 54.png" },
  { id: 5, title: "Genres", icon: "Group 53.png" },
  { id: 6, title: "Watch Later", icon: "Group 47.png" },
];

const Menu = () => {
  return (
    <div className="menu-container">
      <div>
        <div className="account">
          <img src="assets/user-img.png" alt="user" />
          <p className="name">Daniel</p>
        </div>
        <div className="menu-items">
          {menuList.map((item) => {
            return (
              <div className="item" key={item.id}>
                <img src={`assets/icons/${item.icon}`} alt={item.title} />
                <p className="text">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <div>Language</div>
        <div>Get help</div>
        <div>Exit</div>
      </div>
    </div>
  );
};

export default Menu;
