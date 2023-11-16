const Follow = () => {
  const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <div className="follow-modal-bg">
      <div className="follow-modal">
        <h3>follow</h3>
        <hr />
        <ul>
          {array.map((item) => (
            <li className="follow-list">
              <div>
                <img
                  src="https://e0.pxfuel.com/wallpapers/868/601/desktop-wallpaper-cool-top-95-best-cool-background-awesome-mobile.jpg"
                  alt=""
                />
                <div className="follow-list-left">
                  <h5>{item}</h5>
                  <div>나는 최고다!</div>
                </div>
              </div>
              <button className="follow-btn">follow</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Follow;
