const { Gem, Models } = require('@gem.co/api').SDK;
const { GEM_API_KEY, GEM_API_SECRET } = process.env;

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  baseUrl: 'https://vgs-dev.gem.farm',
  options: {
    timeout: 60000,
  },
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

module.exports = gem;
