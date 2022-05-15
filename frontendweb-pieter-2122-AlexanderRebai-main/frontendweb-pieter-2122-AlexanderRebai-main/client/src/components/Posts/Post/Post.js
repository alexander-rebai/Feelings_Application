import React from 'react';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => navigate(`/posts/${post._id}`);

    const shortenSentence = (str) => {
        if (str.length > 30) {
            return (str.substring(0, 30) + "...");
        }
        else {
            return str;
        }
    }

    return (
        <Card className={classes.card} raised elevation={6}>
                <div style={{ cursor:'pointer' }} onClick={openPost}>
                    <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                    <div className={classes.overlay}>
                        <Typography variant='h6'>{post.name}</Typography>
                        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                         <div className={classes.overlay2} name="edit">
                         <Button
                           onClick={(e) => {
                             e.stopPropagation();
                             setCurrentId(post._id);
                           }}
                           style={{ color: 'white' }}
                           size="small"
                         >
                           <MoreHorizIcon fontSize="medium" />
                         </Button>
                       </div>
                    )}
                    <div className={classes.details}>
                        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className={classes.title} gutterBottom variant="h4" component="h2" >{post.title}</Typography>
                    <CardContent>
                        <Typography style={{ flexShrink: 1 }} variant='body1' color='textSecondary' component='p'>{shortenSentence(post.message)}</Typography>
                    </CardContent>
                </div>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        &nbsp;
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;