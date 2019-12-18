import { REACT_APP_GEM_API_KEY } from "../../constants/Env";

let GC;

window.onGemReady = () => {
  GC = new window.Gem.Connect({
    apiKey: REACT_APP_GEM_API_KEY,
    partnerName: 'Flow',
    partnerIconUrl: 'https://app-stage.gem.co/images/wallet/icon_demo_wallet@2x.png',
  });
}

export const openGemConnect = ({ onSuccess, institution }) => {
  GC.open({ onSuccess, institution });
}
