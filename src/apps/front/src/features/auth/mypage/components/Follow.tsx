import classNames from 'classnames';
import useMypage from '../hooks/useMypage';
const Follow = () => {
  const {
    handleFollowClose,
    modalBubbling,
    follow,
    handleFollowBtn,
    unfollow,
    query: { data },
  } = useMypage();

  return (
    <div className="follow-modal-bg" onClick={modalBubbling()}>
      <div className="follow-modal">
        <div>
          <div></div>
          <h3>follow</h3>
          <button onClick={handleFollowClose}>X</button>
        </div>
        <hr />
        <ul>
          {data?.follow?.map((item) => (
            <li key={item._id} className="follow-list">
              <div>
                <img
                  src="https://e0.pxfuel.com/wallpapers/868/601/desktop-wallpaper-cool-top-95-best-cool-background-awesome-mobile.jpg"
                  alt=""
                />
                <div className="follow-list-left">
                  <h5>{item._id}</h5>
                  <div>나는 최고다!</div>
                </div>
              </div>
              <button
                onClick={handleFollowBtn}
                className={classNames('mypage-follow-btn', {
                  'mypage-follow-btn-unfollow': unfollow,
                })}
              >
                {follow}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Follow;
