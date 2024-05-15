document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    // Event listener for the form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent default form submission
      const searchQuery = document.getElementById('search').value;  // Get the search query
      searchUsers(searchQuery);  // Search for users based on the query
    });
  
    // Function to search for users based on the query
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'  // Request v3 of the API
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);  // Display users
      })
      .catch(error => console.error('Error fetching users:', error));
    }
  
    // Function to display users in the DOM
    function displayUsers(users) {
      userList.innerHTML = '';  // Clear previous results
      reposList.innerHTML = '';  // Clear previous repo results
  
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user.login;  // Display the username
        userItem.addEventListener('click', () => {
          fetchUserRepos(user.login);  // Fetch and display user repos on click
        });
        userList.appendChild(userItem);  // Append to the user list
      });
    }
  
    // Function to fetch repositories for a specific user
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'  // Request v3 of the API
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);  // Display repositories
      })
      .catch(error => console.error('Error fetching repositories:', error));
    }
  
    // Function to display repositories in the DOM
    function displayRepos(repos) {
      reposList.innerHTML = '';  // Clear previous results
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;  // Display the repository name
        reposList.appendChild(repoItem);  // Append to the repos list
      });
    }
  });
  