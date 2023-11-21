import userModel from '../../shared/db/userModel';
import followModel from '../../shared/db/followModel';
import followerModel from '../../shared/db/followerModel';
import mongoose from 'mongoose';

const imageUpload = async (req, res) => {
  try {
    console.log('test');
    console.log(req.files);
    const userProfilePath = req.files['profileImage'][0].location;
    const userBackgroundlPath = req.files['bgImage'][0].location;
    const id = req.body.id;
    const status = req.body.status;
    console.log(status);

    const updatedUser = await userModel
      .findOneAndUpdate(
        { id: id },
        {
          $set: {
            user_background_img: userBackgroundlPath,
            user_profile_img: userProfilePath,
            user_status_msg: status,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedUser) {
      return res.json({ msg: 'User does not exist' });
    }

    return res.json({
      background: userBackgroundlPath,
      profile: userProfilePath,
      status: status,
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserData = async (req, res) => {
  const ownerId = new mongoose.Types.ObjectId(req.query.id);

  const result = await userModel
    .findById(ownerId)
    .populate({
      path: 'posts',
      populate: { path: 'owner', select: 'user_profile_img id' },
    })
    .populate({
      path: 'follow',
      populate: { path: 'follow', select: 'user_profile_img id' },
    })
    .populate({
      path: 'follower',
      populate: { path: 'follower', select: 'user_profile_img id' },
    })
    .populate('saved_images');
  console.log('resultuser', result);
  res.json(result);
};

const AddFollow = async (req, res) => {
  const { owner, follow, unfollow } = req.body;
  console.log('owner, follow', owner, follow);
  console.log(unfollow);
  const ownerId = new mongoose.Types.ObjectId(req.body.owner);
  const followId = new mongoose.Types.ObjectId(req.body.follow);
  if (unfollow) {
    console.log('ownerId', ownerId);
    const addFollow = new followModel({ owner: ownerId, follow: followId });
    await addFollow.save();
    const user = await userModel.findById(ownerId);

    user.follow.push(addFollow._id);
    await user.save();
    const addFollower = new followerModel({
      owner: followId,
      follower: ownerId,
    });
    await addFollower.save();

    const followerUser = await userModel.findById(followId);

    followerUser.follower.push(addFollower._id);
    await followerUser.save();
  } else {
    const ownerId = new mongoose.Types.ObjectId(owner);
    const followId = new mongoose.Types.ObjectId(follow);
    await followModel.deleteOne({ owner: ownerId, follow: followId });
    await followerModel.deleteOne({ owner: followId, follower: ownerId });
  }
  // 만약에 userId랑 Id랑 같이 있다면 true값을 보내라..
  res.json({ follow: 'true' });
};

export { imageUpload, getUserData, AddFollow };
