import Community from '../../models/Community';
import User from '../../models/User';

export default async function viewCommunityController(req, res) {
  const { id } = req.params;

  try {
    const community = await Community.findById(id).exec();
    const user = await User.findById(req.user._id);

    if (!community) {
      return res.status(404).send();
    }

    const isMember = user.communities
      .map((a) => a._id.toString())
      .includes(community._id);

    return res.send({
      isMember,
      ...community.toJSON(),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ code: 'FAILED', error: e.message });
  }
}
