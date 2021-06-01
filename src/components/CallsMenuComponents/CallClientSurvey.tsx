import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import callServices from '../../services/callServices';
import { CallState } from '../../redux/types/ConnectionTypes';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { AccordionActions, Modal, Typography, Backdrop, Fade, Divider, Button, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

// interface DispatchProps {
//   addRatingToCall: typeof callServices.addRating;
// }

interface StateProps {
  call: CallState;
}

interface Props extends StateProps {}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const DisplaySurvey: FC<Props> = (props: Props) => {
  const { call } = props;
  const classes = useStyles();
  const [reply1, setReply1] = useState<any>();
  const [reply2, setReply2] = useState<any>();
  const [reply3, setReply3] = useState<any>();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = (): void => {
    setReply1(null);
    setReply2(null);
    setReply3(null);
    handleClose();
  };

  const fieldsVerified: boolean =
    typeof reply1 !== 'undefined' && typeof reply2 !== 'undefined' && typeof reply3 !== 'undefined';

  const handleRating = (): void => {
    const ratingValue: number = reply1 * 0.4 + reply2 * 0.25 + reply3 * 0.35;
    callServices.addRating(ratingValue, call.id);
    // Called to reset the state
    handleCancel();
    handleClose();
  };
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Respond videocall survey
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Tell us your experience!</h2>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Was the assistant able to solve all your doubts?</Typography>
              <Rating
                name="question-one"
                value={reply1}
                defaultValue={0.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setReply1(newValue);
                }}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Was the assistant´s disposition adequate?</Typography>
              <Rating
                name="question-two"
                value={reply2}
                defaultValue={0.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setReply2(newValue);
                }}
              />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">The response time to the video call was..</Typography>
              <Rating
                name="question-three"
                value={reply3}
                defaultValue={0.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setReply3(newValue);
                }}
              />
            </Box>
            <Divider />
            <AccordionActions>
              <Button onClick={() => handleCancel()}>Cancel</Button>
              <Button color="primary" disabled={!fieldsVerified} onClick={handleRating}>
                Done
              </Button>
            </AccordionActions>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
// const mapStateToProps = (state: RootState): StateProps => {
//   return {
//     call: state.call,
//   };
// };

// export default connect(mapStateToProps)(DisplaySurvey);
export default DisplaySurvey;
