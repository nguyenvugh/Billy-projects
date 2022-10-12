import { Box } from "@chakra-ui/react";
import { CENTER_MAP_LAT, CENTER_MAP_LNG, GOOGLE_MAP_KEY } from "@ltp/utils/constant";
import GoogleMapReact from "google-map-react";
import { PureComponent } from "react";

class Map extends PureComponent {
  googleMapRef;

  googleRef;

  markers;

  markerCluster;

  constructor(props) {
    super(props);
  }

  componentDidUpdate(preProps) {
    if (preProps.officeList !== this.props.officeList) {
      this.updateMarker();
    } else if (preProps.center !== this.props.center) {
      if (this.props.center) {
        this.googleMapRef?.setCenter(new this.googleRef.LatLng(this.props.center));
      }
    }
  }

  getContentString = ({
    name,
    address,
    ward,
    district,
    city,
    phone_number,
    fax,
  }) => `<div style="font-size: 16px; font-weight: 700; font-family: 'Montserrat'">${name}</div>
    <div style="font-size: 14px; font-family: 'Montserrat'; margin-top: 4px;">${address}, ${ward?.name}, ${district?.name}, ${city?.name}</div>
    <div style="font-size: 14px; font-family: 'Montserrat'; margin-top: 4px;">Hotline: ${phone_number}</div>
    <div style="font-size: 14px; font-family: 'Montserrat'; margin-top: 4px;">Fax: ${fax}</div>`;

  updateMarker = () => {
    if (this.googleMapRef && this.googleRef) {
      for (let i = 0; i < this.markers?.length; i++) {
        this.markers[i].setMap(null);
      }
      const infowindow = new this.googleRef.InfoWindow();
      this.markers = this.props.officeList.map((item) => {
        const marker = new this.googleRef.Marker({
          position: { lat: parseFloat(item?.lat), lng: parseFloat(item?.long) },
          icon: {
            url: "/icons/map/marker.png",
            scaledSize: new this.googleRef.Size(24, 30),
          },
          title: item?.name,
        });
        marker.addListener("click", () => {
          infowindow.setContent(this.getContentString(item));
          infowindow.open({
            anchor: marker,
            map: this.googleMapRef,
            shouldFocus: false,
          });
        });
        marker.setMap(this.googleMapRef);
        return marker;
      });
    }
  };

  setGoogleMapRef = ({ map, maps }) => {
    this.googleMapRef = map;
    this.googleRef = maps;
    this.updateMarker();
  };

  render() {
    return (
      <Box
        position="relative"
        height={{ base: "320px", md: "100%" }}
        width="100%"
        minHeight="320px"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.setGoogleMapRef}
          defaultCenter={{ lat: parseFloat(CENTER_MAP_LAT), lng: parseFloat(CENTER_MAP_LNG) }}
          defaultZoom={15}
        >
          <Marker lat={16.66657} lng={112.72541} src="/icons/flags/vi.svg" />
          <Marker lat={10.7233} lng={115.8265} src="/icons/flags/vi.svg" />
        </GoogleMapReact>
      </Box>
    );
  }
}

export default Map;

const Marker = ({ src }) => <img alt="my marker" src={src} className="my-marker" />;
