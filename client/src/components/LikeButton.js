import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

function LikeButton({ user, post: {id, likeCount, likes}}){
    //set default like status to unliked
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        //if the current user logged in as has liked the post...
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true) 
        } else setLiked(false)
        
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    })

    //if the user is logged in and the like button has been clicked...
    const likeButton = user ? (
        liked ? (
            //show this version of the heart
            <Button color="teal">
            <Icon name="heart" />
          </Button>
        ) : (
            //otherwise, show it like this default way
            <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )
    ) : (
        //if the user is NOT logged in... direct them to the login page
        <Button as="Link" to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    )

    return(
        <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    )

}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton;