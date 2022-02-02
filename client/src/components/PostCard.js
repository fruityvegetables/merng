import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import bacon22 from "../images/bacon22.jpg";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import likePost from "./LikeButton"

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } =  useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src={bacon22} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>

        {/* NEW LIKE BUTTON */}
        <LikeButton user={user} post={{ id, likes, likeCount }}/>
        <Button as="div" labelPosition="right" onClick={likePost}>
        </Button>
        
          {/* OLD WAY TO DISPLAY LIKE BUTTON*/}
          {/* <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label> */}

        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" floated="right" onClick={() => console.log("Delete post")}>
            <Icon name="trash" style={{ margin: 0 }} /> 
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
