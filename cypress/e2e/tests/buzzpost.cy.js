describe("Buzz Page Post and Edit Test", () => {
  let postId; // Variable to store the dynamically fetched post ID

  beforeEach(() => {
    // Read cookies to maintain session
    cy.readFile("cypress/fixtures/loginCookies.json").then((cookies) => {
      if (cookies.length > 0) {
        cy.log("Using stored login cookies...");
        cookies.forEach((cookie) => {
          cy.setCookie(cookie.name, cookie.value);
        });
      } else {
        throw new Error("No cookies found! Run loginTest.cy.js first.");
      }
    });

    // Visit the Buzz page
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz"
    );
  });

  it("should create and edit a post dynamically", () => {
    const postUrl =
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/posts";

    // Step 1: Create a new post
    cy.request({
      method: "POST",
      url: postUrl,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "text",
        text: "Hey there!", // Initial post message
      },
    }).then((response) => {
      cy.log("Created Post Response:", response.body);
      expect(response.status).to.equal(200);

      // Extract the post ID dynamically
      postId = response.body.data.post.id;
      cy.log(`New Post ID: ${postId}`);

      // Step 2: Update the post dynamically using the fetched post ID
      const updateUrl = `${postUrl}/${postId}`;

      cy.request({
        method: "PUT",
        url: updateUrl,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          type: "text",
          text: "Updated Post Message!", // New post content
        },
      }).then((updateResponse) => {
        cy.log("Updated Post Response:", updateResponse.body);
        expect(updateResponse.status).to.equal(200);
      });
    });
  });
});

// describe("Buzz Page Post and Edit Test", () => {
//   let postId; // Store the post ID for editing

//   beforeEach(() => {
//     // Read cookies from the login test fixture to maintain session
//     cy.readFile("cypress/fixtures/loginCookies.json").then((cookies) => {
//       if (cookies.length > 0) {
//         cy.log("Using stored login cookies...");
//         cookies.forEach((cookie) => {
//           cy.setCookie(cookie.name, cookie.value);
//         });
//       } else {
//         throw new Error("No cookies found! Run loginTest.cy.js first.");
//       }
//     });

//     // Visit the Buzz page
//     cy.visit(
//       "https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz"
//     );
//   });

//   it("should create and edit a post via API", () => {
//     const postUrl =
//       "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/posts";

//     const postData = {
//       type: "text",
//       text: "Hey dude",
//     };

//     // Step 1: Create a post
//     cy.request({
//       method: "POST",
//       url: postUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: postData,
//     }).then((response) => {
//       console.log("Post Created Response:", response.body);
//       expect(response.status).to.equal(200); // Ensure post was created

//       // Extract the correct post ID
//       postId = response.body.data.post.id; // Extracting post ID correctly

//       // Step 2: Edit the post using PUT request
//       const updatedData = {
//         type: "text",
//         text: "Updated Post Message", // New updated text
//       };

//       cy.request({
//         method: "PUT",
//         url: `${postUrl}/${postId}`, // Append postId to update URL
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: updatedData,
//       }).then((editResponse) => {
//         console.log("Post Edited Response:", editResponse.body);
//         expect(editResponse.status).to.equal(200); // Ensure post was updated
//       });

//       cy.reload(); // Reload to see the updated post in UI
//     });
//   });
// });
