<!-- App.svelte -->
<script>
    let username = '';
    let password = '';
    let loggedIn = false;
  
    function login() {
      // Perform your login logic here (e.g., API call)
      // Assuming successful login, set loggedIn to true
      loggedIn = true;
    }
  
    function logout() {
      // Perform logout logic here (e.g., clear session, tokens, etc.)
      loggedIn = false;
    }
  </script>
  
  <main>
    {#if loggedIn}
      <h1>Welcome, {username}!</h1>
      <button on:click={logout}>Logout</button>
    {:else}
      <h1>Login</h1>
      <form on:submit|preventDefault={login}>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />
  
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} />
  
        <button type="submit">Login</button>
      </form>
    {/if}
  </main>
  