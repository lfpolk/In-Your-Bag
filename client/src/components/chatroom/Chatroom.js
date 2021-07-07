import React, {Fragment} from "react";


import InnerHeader from "./../layouts/InnerHeader";

const Chatroom = ({setAuth}) => {

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}



return (
    <Fragment>
        <InnerHeader/>

    <div class="feed">
        <section class="post">
            <header class="postHeader">
                <div class="postHeader-column">
                    <span class="postUsername">Larson Polk</span>
                </div>
                <div class="postContents">
                    <span>The Chat room has yet to be implemented</span>
                </div>
            </header>
            <div class="postFile-container">
            </div>
            <div class="postInfo">
                <span class="postTime-ago">11 hours ago</span>
                <ul class="postComments">
                    <li class="postComment">
                       
                    </li>
                    <li class="postComment">
                        
                    </li>
                </ul>
                <div class="postAdd-comment-container">
                    <textarea placeholder="Comment..." class="postAdd-comment"></textarea>
                </div>
            </div>
        </section>        
        <section class="post">
            <header class="postHeader">

                <div class="postHeader-column">
                    <span class="postUsername">Larson Polk</span>
                </div>
                <div class="postContents">
                    <span>The chat room will be implemented soon, but you can check out what I throw by clicking on my name</span>
                </div>
            </header>
            <div class="postFile-container">
            </div>
            <div class="postInfo">
                <span class="postTime-ago">11 hours ago</span>
                <ul class="postComments">
                    <li class="postComment">
                        <span class="postComment-author">Larson Polk</span>In the meantime, use your home page to alter your bag and share with friends.
                    </li>
                </ul>                <div class="postAdd-comment-container">
                    <textarea placeholder="Comment..." class="postAdd-comment"></textarea>
                </div>
            </div>
        </section>         
    </div>

    </Fragment>
    );
};

export default Chatroom;