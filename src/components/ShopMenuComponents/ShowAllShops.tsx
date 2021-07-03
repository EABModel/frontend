import React, { FC, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';
import useStyles from '../../styles/AccordionMenuStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { CompanyState } from '../../redux/types/CompanyTypes';
import { ShopState } from '../../redux/types/ShopTypes';
import * as shopInteractors from '../../redux/interactors/shopInteractors';
import {
  Accordion,
  AccordionSummary,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';

interface StateProps {
  company: CompanyState;
  shop: ShopState;
}

interface DispatchProps {
  resetShopStatusInteractor: typeof shopInteractors.resetShopStatusInteractor;
}

interface Props extends StateProps, DispatchProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const ShowAllShops: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, company, shop, resetShopStatusInteractor } = props;
  const styles = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (shop.addShopStatus.success) {
      resetShopStatusInteractor();
    }
  }, [shop.addShopStatus]);

  const handleGoToDevices = (id: string): void => {
    history.push(`/administration/shop/${id}`);
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <Divider />
      <List dense>
        {company.shops.map((shop) => {
          return (
            <ListItem key={shop.id} button>
              <ListItemText id={shop.id} primary={`${shop.name}`} secondary={`Location: ${shop.location}`} />
              <ListItemSecondaryAction>
                <Button size="small" variant="contained" onClick={() => handleGoToDevices(shop.id)}>
                  View devices
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    company: state.company,
    shop: state.shop,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...shopInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllShops);
