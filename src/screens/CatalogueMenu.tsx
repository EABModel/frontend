import React, { FC, useState } from 'react';
import useStyles from '../styles/AccordionMenuStyles';
import CreateSigleProductAccordionRow from '../components/CatalogueMenu/ProductRegister';

const CatalogueMenu: FC = () => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.mainContainer}>
      <CreateSigleProductAccordionRow
        expanded={expanded}
        handleChange={handleChange}
        panel={'panel1'}
        heading={'Create Single Product'}
        summary={'Here you can create a product for this shop, giving all its necesary attributes.'}
      />
      <CreateSigleProductAccordionRow
        expanded={expanded}
        handleChange={handleChange}
        panel={'panel2'}
        heading={'Create Single Product'}
        summary={'Here you can create a product for this shop, giving all its necesary attributes.'}
      />
    </div>
  );
};

export default CatalogueMenu;
