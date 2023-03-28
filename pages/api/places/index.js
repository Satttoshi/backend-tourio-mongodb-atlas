import dbConnect from "../../../db/connect.js";
import Place from "../../../db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  } else if (request.method === "POST") {
    try {
      await Place.create(request.body);
      return response.status(201).json({ status: "place created" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ status: "error" });
    }
  } else {
    response.status(405).json({ status: "Method not allowed!" });
  }
}
