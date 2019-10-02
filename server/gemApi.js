const { Gem, Models } = require('@gem.co/api').SDK;
const { GEM_API_KEY, GEM_API_SECRET } = process.env;
// const GEM_API_KEY = '24bcace60a36d575762f1ba6fa4788b097ee53884cb2cb52e04992fb58afa51a'
// const GEM_API_SECRET = 'bbe7ec6188e62a2c31d2e0379146d28884ff00f3c6444990c89c1b09b925b2b2'

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
});


const createUser = async (email) => {

  try {
    const result = await gem.createUser(email);
    return result;
  } catch (e) {
    console.error(e);
  }
}

const listUsers = async () => {

  try {
    const result = await gem.listUsers();
    return result;
  } catch (e) {
    console.error(e);
  }
}

const getUser = async (id) => {

  try {
    const result = await gem.getUser(id);
    return result;
  } catch (e) {
    console.error(e);
  }
}

const createProfile = async (id, input) => {

  const profile = new Models.Profile(input)

  try {
    const result = await gem.createProfile(id, profile);
    return result;
  } catch (e) {
    console.error(e);
  }
}

const getProfile = async (id) => {

  try {
    const result = await gem.getUser(id);
    return result;
  } catch (e) {
    console.error(e);
  }
}

const createTemporaryProfile = async (id, input) => {

  const profile = new Models.Profile(input);

  try {
    const result = await gem.createTemporaryProfile(id, profile);
    return result;
  } catch (e) {
    console.error(e);
  }
}

const deleteProfile = async (id) => {

  try {
    const result = await gem.deleteProfile(id);
    return result;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createUser,
  getUser,
  listUsers,
  createProfile,
  getProfile,
  createTemporaryProfile,
  deleteProfile
};
