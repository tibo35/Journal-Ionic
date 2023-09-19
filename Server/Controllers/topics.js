import mongodb from "mongodb";
const { ObjectId } = mongodb;

export async function getTopics(req, res) {
  const db = req.db;

  try {
    const allCards = await db.collection("Cards").find().toArray();
    res.json(allCards);
  } catch (error) {
    console.error("Error fetching topics:", error);

    res.status(500).json({ message: "Failed to fetch topics" });
  }
}

export async function createTopic(req, res) {
  const db = req.db;
  const card = req.body;
  try {
    await db.collection("Cards").insertOne(card);
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: "Failed to create topic" });
  }
}
// ------------------ DELETE Topic ------------------
export async function deleteTopic(req, res) {
  const db = req.db;
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  console.log("DELETE /topics/" + id);
  // Delete associated tasks
  await db.collection("Tasks").deleteMany({ cardId: new ObjectId(id) });
  // Delete the topic/card
  await db.collection("Cards").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Topic deleted" });
}
