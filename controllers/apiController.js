// GET /api
function index(req, res) {
  res.json({
      message: 'welcome to API info for Wayfarer',
      collaborators: 'Michael Laird, Kevin Tse, Sejin Kim, Jane Wie',
      documentation_url: 'https://github.com/MJ-sfo/Wayfarer',
      endpoints: []
    });
  }

module.exports = {
  index: index
}
