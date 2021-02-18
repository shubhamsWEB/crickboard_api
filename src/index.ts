export const apiCalls = (axios:any) => {
  return {
    createMatch: async (data:object) => {
      const response = await axios.post("/match", data);
      return response;
    },
    updateToss: async (data:object, matchId:number) => {
      const response = await axios.patch(`/toss/${matchId}`, data);
      return response.data;
    },
    getAllMatchData: async () => {
      const response = await axios.get("/matchdata");
      return response.data;
    },
    getTenBalls: async (matchId:number, innings:number) => {
      const response = await axios.get(`/balls/${matchId}/${innings}`);
      return response.data;
    },
    getLiveData: async (matchId:number) => {
      const response = await axios.get(`/livematch/${matchId}`);
      return response.data;
    },
    getMatchInfo: async (matchId:number) => {
      try {
        const response = await axios.get(`/matchinfo/${matchId}`);
        return response;
      } catch (error) {
        if (error.response.status === 403) {
          return error.response;
        }
      }
    },
    userSignup: async (data:object) => {
      const response = await axios.post("/user/", data, {
        withCredentials: true,
      });
      return response.data;
    },
    userLogin: async (data:object) => {
      const response = await axios.post("/user/login/", data, {
        withCredentials: true,
      });
      return response.data;
    },
    updateMatchInfo: async (data:object, matchId:number) => {
      const response = await axios.patch(`/matchinfo/${matchId}`, data);
      return response.data;
    },
    // user logout
    userLogout: async () => {
      const response = await axios.get("/logout/", { withCredentials: true });
      return response.data;
    },
    getMatchData: async (matchId:number) => {
      const response = await axios.get(`/matchdata/${matchId}`);
      return response.data;
    },
    getCommentary: async (matchId:number) => {
      const response = await axios.get(`/balls/match/${matchId}`);
      return response.data;
    },
    updateLiveScore: async (data:object) => {
      const response = await axios.post("/livematch", data);
      return response.data;
    },
    undoLiveScore: async (data:object, ballId:number) => {
      const response = await axios.patch(`/livematch/${ballId}`, data);
      return response.data;
    },
    changeStrick: async (data:object, matchId:number) => {
      const response = await axios.patch(`/playerstats/${matchId}`, data);
      return response;
    },
    getPlayer: async (playerId:number, matchId:number) => {
      const response = await axios.get(`/playerdata/${playerId}/${matchId}`);
      return response.data;
    },
    getTeams: async (matchId:number) => {
      const response = await axios.get(`/playerdata/${matchId}`);
      return response.data;
    },
    getHighlights: async (matchId:number) => {
      const response = await axios.get(`/highlights/${matchId}`);
      return response.data;
    },
    getScoreCard: async (matchId:number, batId:number, _bowlId:number, innings:number) => {
      const response = await axios.get(`/scorecard/${matchId}`);
      const Data = response.data.data;
      const firstInnigsBatting:any = [];
      const firstInningsBowling:any = [];
      const secondInnigsBatting:any = [];
      const secondInningsBowling:any = [];
      const Innings = [];
      Data.matchScoreCard.map((player:any) => {
        if (innings === 1) {
          if (player.teamId === batId) {
            firstInnigsBatting.push(player);
          } else {
            firstInningsBowling.push(player);
          }
        } else {
          if (player.teamId === batId) {
            secondInnigsBatting.push(player);
            firstInningsBowling.push(player);
          } else {
            secondInningsBowling.push(player);
            firstInnigsBatting.push(player);
          }
        }
      });
      Innings.push({
        innings: 1,
        batting: firstInnigsBatting,
        bowling: firstInningsBowling,
      });
      if (innings === 2) {
        Innings.push({
          innings: 2,
          batting: secondInnigsBatting,
          bowling: secondInningsBowling,
        });
      }
      response.data.data.Innings = Innings;
      return response.data;
    },
    verifyUser: async (data:object, userId:number) => {
      const response = await axios.patch(`/user/${userId}`, data);
      return response;
    },
    checkMatchAdmin: async (matchId:number, userId:number) => {
      const userIdString = JSON.stringify(userId);
      const response = await axios.get(
        `/matchadmincheck/${matchId}/${userIdString}`
      );
      return response.data.data.isAdmin;
    },
    deleteBall: async (id:number) => {
      const resp = await axios.delete(`/balls/${id}`);
      return resp.data;
    },
    checkTeamOwner: async (teamId:number, userId:number) => {
      const userIdString = JSON.stringify(userId);
      const response = await axios.get(
        `/teamownercheck/${teamId}/${userIdString}`
      );
      return response.data.data.isOwner;
    },
    subscribeToMatch: async (data:object) => {
      const response = await axios.post("/subscription", data);
      return response.data;
    },

    getSubscribedMatches: async (userId:number) => {
      const response = await axios.get(`/subscription/${userId}`);
      return response.data;
    },

    removeSubscription: async (id:number) => {
      const response = await axios.delete(`/subscription/${id}`);
      return response.data;
    },
    getAllTeams: async () => {
      const response = await axios.get(`/team`);
      return response.data;
    },
    createTeam: async (data:object) => {
      const response = await axios.post(`/team`, data);
      return response.data;
    },
    createChallengeMatch: async (data:object) => {
      const response = await axios.post("/match/challenge", data);
      return response;
    },

    getTeamPlayers: async (teamId:number) => {
      const response = await axios.get(`/player/team/${teamId}`);
      return response.data;
    },
    addPlayer: async (data:object) => {
      const response = await axios.post(`/player`, data);
      return response.data;
    },
    clearCompleteMatchData: async (matchId:number, teamAId:number, teamBId:number) => {
      const response = await axios.delete(
        `/match/${matchId}/${teamAId}/${teamBId}`
      );
      return response;
    },

    checkIsMatchVerified: async (matchId:number) => {
      const response = await axios.get(`/match/isverified/${matchId}`);
      return response.data.data.is_verified;
    },
    verifyMatch: async (data:object, matchId:number) => {
      const response = await axios.patch(`/match/verify/${matchId}`, data);
      return response.data;
    },
  };
};
