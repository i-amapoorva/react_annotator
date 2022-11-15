class TokenService {    

    setLocalAccessToken(token) {
      localStorage.setItem("token", "Bearer "+token);
    }
  
    getLocalAccessToken() {
      return localStorage.getItem("token");
    }
    
    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }

    setRefreshToken(refreshToken){
      localStorage.setItem("refreshToken", refreshToken);
    }

    setProjectDetails(projectDetails){ 
      localStorage.setItem("projectDetails",JSON.stringify(projectDetails));
    }

    getProjectDetails(){
      return JSON.parse(localStorage.getItem("projectDetails"));
    }

    removeProjectDetails(){
      localStorage.removeItem("projectDetails");
    }

    removeUser() {
      localStorage.removeItem("user");
    }
    clearStorage() {
      localStorage.clear();
    }
  }
  export default new TokenService();
  