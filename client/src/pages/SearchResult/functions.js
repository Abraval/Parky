import API from "../../utils/API";

export async function findAllAvailAndNear(formattedDates, longLatArray) {
  try {
    console.log("Starting to findAllAvailAndNear");
    const availableData = await API.getAvailableListings(formattedDates);
    const listingNearData = await API.getListingByIdAndProximity(longLatArray);
    console.log(
      "AvailableData: ",
      availableData,
      "listingNearData: ",
      listingNearData
    );
    availableData.data.some(r => {
      console.log("WOW", r);
      listingNearData.data.includes(r);
    });
    return { availableData, listingNearData };
  } catch (error) {
    console.error("Error occurred findAllAvailAndNear", error);
  }
}
