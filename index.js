const [, , command, ...args] = process.argv;
// console.log(command);
async function GetUserActivity(name) {
  try {
    const data = await fetch(`https://api.github.com/users/${name}/events`);
    const events = await data.json();
    if (events.length == 0) {
      console.log("No recent activity found .");
      return;
    }

    events.forEach((event) => {
      switch (event.type) {
        case "PushEvent":
          console.log(`Pushed ${event.payload.commits.length}`);
          break;
        case "IssuesEvent":
          console.log(`Opened a new issue in ${event.repo.name}`);
          break;
        case "WatchEvent":
          console.log(`Starred ${event.repo.name}`);
          break;
        default:
          console.log(`Performed ${event.type} in ${event.repo.name}`)
      }
    });
    // return d;
  } catch (error) {
    console.log(error);
  }
}

if (command === "github-activity") {
  const nameOfUser = args.join(" ");
//   console.log(nameOfUser);
  GetUserActivity(nameOfUser);
} else {
  console.log("Invalid Command");
}
// GetUserActivity()
