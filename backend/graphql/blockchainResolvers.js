module.exports = {
  getHighestScore: async ({ quizId }) => {
    try {
      if (!quizLeaderboardContract) {
        throw new Error("quizLeaderboardContract not connected");
      }

      await quizLeaderboardContract.getHighestScore(quizId);
      return 0;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve highest score");
    }
  },
  getLeaderboard: async ({ quizId }) => {
    try {
      if (!quizLeaderboardContract) {
        throw new Error("quizLeaderboardContract not connected");
      }

      const leaderboardData = await quizLeaderboardContract.getLeaderboard(
        quizId
      );

      // Check if the leaderboard is empty
      if (leaderboardData.length === 0) {
        return [];
      }

      return leaderboardData.map((entry) => ({
        player: entry.player,
        score: entry.score.toNumber(),
      }));
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve leaderboard");
    }
  },

  getScore: async ({ quizId, index }) => {
    try {
      if (!quizLeaderboardContract) {
        throw new Error("quizLeaderboardContract not connected");
      }

      // Call the contract function `leaderboards` with both `quizId` and `index` as arguments
      const scoreEntry = await quizLeaderboardContract.leaderboards(
        quizId,
        index
      );
      return {
        player: scoreEntry.player,
        score: scoreEntry.score.toNumber(),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve score");
    }
  },

  getUnlockTime: async () => {
    if (!quizLeaderboardContract) {
      throw new Error("Contract not connected");
    }
    const unlockTime = await contract.unlockTime();
    return unlockTime.toString();
  },

  getOwner: async () => {
    if (!contract) {
      throw new Error("Contract not connected");
    }
    const owner = await contract.owner();
    return owner;
  },
  updateQuizScore: async ({ quizId, score }) => {
    const privateKey =
      "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
    const signer = new ethers.Wallet(privateKey, provider);

    const leaderboardWithSigner = quizLeaderboardContract.connect(signer);
    const tx = await leaderboardWithSigner.updateScore(quizId, score);
    await tx.wait();
    return "Score updated successfully";
  },
  withdraw: () => {
    if (!lockContract) {
      throw new Error("Contract not connected");
    }
  },
};
