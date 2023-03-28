import Place from "../../../../db/models/Place.js";

export default async function handler(request, response) {
  const { id } = request.query;
  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Place not found" });
    }
    response.status(200).json(place);
  } else if (request.method === "PATCH") {
    const update = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(update);
  } else if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place deleted" });
  } else {
    response.status(405).json({ status: "Method not allowed!" });
  }
}
