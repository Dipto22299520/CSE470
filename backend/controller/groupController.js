const { GroupStudy } = require('../model/Group');

// Create group study session
exports.createGroupStudy = async (req, res) => {
  try {
    const study = await GroupStudy.create(req.body);
    res.status(201).json(study);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group study', error });
  }
};

// Fetch all group study sessions
exports.getAllGroupStudies = async (req, res) => {
  try {
    const studies = await GroupStudy.findAll();
    res.status(200).json(studies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group studies', error });
  }
};
