import { REACT_APP_GEM_API_KEY } from "../../constants/Env";

export const openGemConnect = ({ onSuccess, institution }) => {
  const GC = new window.Gem.Connect({
    onSuccess,
    apiKey: REACT_APP_GEM_API_KEY,
    partnerName: 'Flow',
    partnerIconUrl: 'https://app-stage.gem.co/images/wallet/icon_demo_wallet@2x.png',
  });
  GC.open({ institution });
}
