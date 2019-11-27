export const openGemConnect = ({ onSuccess, institution }) => {
  const GC = new window.Gem.Connect({
    onSuccess,
    apiKey: process.env.REACT_APP_GEM_API_KEY,
  });
  GC.open({ institution });
}
