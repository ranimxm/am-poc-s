export class Room {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.teams = [];
    this.isGameStarted = false;
    this.scores = {};
  }

  addTeam(teamName) {
    this.teams.push(teamName);
    this.scores[teamName] = 0;
  }

  getTeams() {
    return this.teams;
  }

  startGame() {
    this.isGameStarted = true;
  }

  hasGameStarted() {
    return this.isGameStarted;
  }
}

export class RoomManager {
  constructor() {
    this.rooms = {};
  }

  createRoom() {
    const roomCode = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit room code
    this.rooms[roomCode] = new Room(roomCode);
    return roomCode;
  }

  joinRoom(roomCode, teamName) {
    const room = this.rooms[roomCode];
    if (room) {
      room.addTeam(teamName);
      return true;
    }
    return false;
  }

  startGameInRoom(roomCode) {
    const room = this.rooms[roomCode];
    if (room) {
      room.startGame();
      return true;
    }
    return false;
  }

  submitChoice(roomCode, teamName, timeTaken) {
    const room = this.rooms[roomCode];
    if (room) {
      const score = 100 - timeTaken * 10;
      room.updateScore(teamName, score);
      return true;
    }
    return false;
  }

  getRoomTeams(roomCode) {
    const room = this.rooms[roomCode];
    return room ? room.getTeams() : [];
  }
}