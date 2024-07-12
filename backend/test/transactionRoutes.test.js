const request = require("supertest");
const app = require("../app");

describe("POST /record-progress", () => {
  it("should update the user profile and return the updated profile", async () => {
    const response = await request(app)
      .post("/record-progress")
      .send({
        quizId: "12345",
        quizScore: 80,
        quizTimeTaken: 60,
      })
      .set("Authorization", "Bearer <your_token_here>");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("userProgress");
    expect(response.body.userProgress).toHaveProperty("userId");
    expect(response.body.userProgress).toHaveProperty("courseId");
    expect(response.body.userProgress).toHaveProperty("score");
    expect(response.body.userProgress).toHaveProperty("timeTaken");
    expect(response.body.userProgress).toHaveProperty("completedQuizzes");
    expect(response.body.userProgress).toHaveProperty("lastActive");
  });
});
