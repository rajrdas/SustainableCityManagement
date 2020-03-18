const key = 'AIzaSyDlqp_xDwz-gGxa4BfprQ_cyl98Obgdc6w';

export const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`;

const convertTolatLng = (latLng, title) => {
  return {
    latLng,
    title
  };
};

export const locationsList = {
  Donnybrook : convertTolatLng("53.3193, 6.2320", "Donnybrook"),
  Ashtown: convertTolatLng("53.3678, 6.3181", "Ashtown"),
  Ranelagh: convertTolatLng("53.3253, 6.2550", "Ranelagh"),
  Broadstone: convertTolatLng("53.3596, 6.2730", "Broadstone"),
 };
