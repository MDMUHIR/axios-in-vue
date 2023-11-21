// Composable function with ref
import { ref, isRef, unref, watchEffect } from "vue";
import axios from "axios";

// Get single user data
function getSingleUserData(url, uid) {
  const userData = ref(null);
  const error = ref(null);
  const getSingleData = async () => {
    //reset state before fetching
    userData.value = null;
    error.value = null;

    try {
      //unref() returns the inner value if the argument is ref otherwise return the argument itself.

      const res = await axios(unref(url) + unref(uid));
      //   console.log("Res:", res)
      //   console.log(res.data.data);
      userData.value = res.data.data;
    } catch {
      error.value = err;
    }
  };

  //isRef() checks if a value is a ref obj or not.
  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(getSingleData);
  } else {
    // Just fetch once and avoid the overhead of a watcher
    getSingleData();
  }
  return { userData, error };
}

// ********** Get All User Data ###########

function getAllUserData(url) {
  const usersData = ref(null);
  const errors = ref(null);
  const getAllData = async () => {
    usersData.value = null;
    errors.value = null;
    try {
      const res = await axios(unref(url));
      usersData.value = res.data.data;
    } catch (err) {
      errors.value = err;
    }
  };
  if (isRef(url)) {
    watchEffect(getAllData);
  } else {
    getAllData();
  }
  return { usersData, errors };
}
// ______________________________________________
// ______________________________________________

// ************** Post User Data ##############
// ______________________________________________

function postUserData(url, name, job) {
  const postData = async () => {
    try {
      const config = {
        method: "POST",
        url: unref(url),
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ name: unref(name), job: unref(job) }),
      };
      const res = await axios(config);
      console.log(res);
      userData.value = res.data;
    } catch (err) {
      errors.value = err
    }
  };
  if(isRef(url)) {
    watchEffect(postData)
  } else {
    postData()
  }
  return { userData, errors}
}

export { getSingleUserData, getAllUserData, postUserData };
