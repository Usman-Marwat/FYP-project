import React, { useState, useEffect, useContext } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import DropDownPicker from "react-native-dropdown-picker";
import _ from "lodash";

import Card from "../../components/Card";
import colors from "../../config/colors";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import Pagination from "../../components/Pagination";
import routes from "../../navigation/routes";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import Tagline from "../../components/Tagline";
import MaterialDetails from "../../components/MaterialDetails";

const { width, height } = Dimensions.get("window");
const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.17,
  shadowRadius: 10,
};
const badgeDotColors = [
  "#e76f51",
  "#00b4d8",
  "#e9c46a",
  "#e76f51",
  "#8ac926",
  "#00b4d8",
  "#e9c46a",
];
const keys = [
  {
    name: "Masonry",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1663127083499-815166fe60ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFzb25yeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    items: [
      {
        name: "Ashlar",
        image:
          "https://img.freepik.com/premium-photo/photo-wall-made-roughly-processed-stone-bricks_646632-713.jpg?w=1800",
        description:
          "Ashlar is finely dressed (cut, worked) stone, either an individual stone that has been worked until squared, or a structure built from such stones. Ashlar is the finest stone masonry unit, generally rectangular cuboid, \nAshlar blocks have been used in the construction of many buildings as an alternative to brick or other materials.",
      },
      {
        name: "Rubble",
        image:
          "https://img.freepik.com/free-photo/flat-lay-seamless-texture-stones_23-2148327745.jpg?w=1800&t=st=1665403753~exp=1665404353~hmac=f4f9a34b3dfd3a8af4c6b8bb2f6178d1209285f668b1a3d484970778c2651f28",
        description:
          "Rubble stone is rough, uneven building stone not laid in regular courses. It may fill the core of a wall which is faced with unit masonry such as brick or ashlar",
      },
      {
        name: "Brick",
        image:
          "https://img.freepik.com/free-photo/red-brick-wall-pattern-texture_53876-23210.jpg?w=1800&t=st=1665408723~exp=1665409323~hmac=3581c24e9a5a4a502529572217eef5e7fa1476a7f8260d8c51c147f0066e15d8",
        description: `A brick is a type of block used to build walls, pavements and other elements in masonry construction. Properly, the term brick denotes a block composed of dried clay, but is now also used informally to denote other chemically cured construction blocks. 

Common or building – A brick not intended to be visible, used for internal structure
Face – A brick used on exterior surfaces to present a clean appearance
Hollow – not solid, the holes are less than 25% of the brick volume
Perforated – holes greater than 25% of the brick volume
Keyed – indentations in at least one face and end to be used with rendering and plastering
Paving – brick intended to be in ground contact as a walkway or roadway
Thin – brick with normal height and length but thin width to be used as a veneer`,
      },
      {
        name: "Concrete Block",
        image:
          "https://img.freepik.com/free-photo/worker-builds-cinder-block-wall-new-home_661209-381.jpg?w=1060&t=st=1665404699~exp=1665405299~hmac=d083059fce2d40bb82ef82327ddd7ee481c4e300fb3e00dbb230d41a47ea1d19",
        description:
          "They usually are much larger than ordinary bricks and so are much faster to lay for a wall of a given size. Furthermore, cinder and concrete blocks typically have much lower water absorption rates than brick",
      },
      {
        name: "Veener",
        image:
          "https://img.freepik.com/free-photo/texture-background_1404-117.jpg?w=1800&t=st=1665404955~exp=1665405555~hmac=d312060f66e0e4c072b2468cc87afad4ff1c46970a37ca82c29b5a5fb8fcd025",
        description:
          "A masonry veneer wall consists of masonry units, usually clay-based bricks, installed on one or both sides of a structurally independent wall usually constructed of wood or masonry. In this context, the brick masonry is primarily decorative, not structural.",
      },
      {
        name: "Gabions",
        image:
          "https://img.freepik.com/premium-photo/basket-support-wall-made-granite-gabion-gabions-garden-modern-gabion-fence-with-stones_132482-4171.jpg?w=1380",
        description:
          "Gabions are baskets, usually now of zinc-protected steel (galvanized steel) that are filled with fractured stone of medium size. These will act as a single unit and are stacked with setbacks to form a revetment or retaining wall. ",
      },
    ],
  },
  {
    name: "Mortar/Aggregate",
    imageUrl:
      "https://images.unsplash.com/photo-1567404469884-75c0620d0912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW9ydGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    items: [
      {
        name: "Portland cement",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mortar_mixed_inside_bucket.jpg/440px-Mortar_mixed_inside_bucket.jpg",
        description:
          "Ordinary Portland cement mortar, commonly known as OPC mortar or just cement mortar, is created by mixing powdered Ordinary Portland Cement, fine aggregate and water",
      },
      {
        name: "Polymer cement",
        image:
          "https://img.freepik.com/premium-photo/installation-styrofoam-insulation-sheets-house-facade-wall-thermal-protection_127089-19363.jpg?w=1800",
        description:
          "Polymer cement mortars (PCM) are the materials which are made by partially replacing the cement hydrate binders of conventional cement mortar with polymers. The polymeric admixtures include latexes or emulsions, redispersible polymer powders, water-soluble polymers, liquid thermoset resins and monomers. Although they increase cost of mortars when used as an additive, they enhance properties.",
      },
      {
        name: "Lime mortar",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Enduit_chaux.JPG/440px-Enduit_chaux.JPG",
        description:
          "The setting speed can be increased by using impure limestone in the kiln, to form a hydraulic lime that will set on contact with water. Such a lime must be stored as a dry powder. Alternatively, a pozzolanic material such as calcined clay or brick dust may be added to the mortar mix. Addition of a pozzolanic material will make the mortar set reasonably quickly by reaction with the water.",
      },
      {
        name: "Pozzolanic mortar",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Puzzolane_stones_from_Vesuvius_Italy.jpg/440px-Puzzolane_stones_from_Vesuvius_Italy.jpg",
        description:
          "It is found in all the volcanic areas of Italy in various colours: black, white, grey and red. Pozzolana has since become a generic term for any siliceous and/or aluminous additive to slaked lime to create hydraulic cement. Finely ground and mixed with lime it is a hydraulic cement, like Portland cement, and makes a strong mortar that will also set under water.",
      },
      {
        name: "Concrete Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/concrete-sand.jpg",
        description:
          "It is obtained from crushed concrete with a mixture of asphalt and cement. It is crushed in the quarry and filtered to remove large rock fragments. Mixing sand and water with it reduces its coarseness and is used in leveling base layers, constructing walking paths etc. Since the grains of this kind of sand is small, they can be used to construct softer pavements. It provides fundamental rigidity to the base of a building. When mixed with cement and water, the solid mass can be used to fill the voids between coarse aggregates. It is smaller-grained when compared to crushed stone sand and hence can be used to construct softer pavements.",
      },
      {
        name: "Fill Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/filling-sand.jpg",
        description:
          "It is a recycled by-product of crushed bricks, tiles, concrete etc. suitable for use as a base for concrete, paving and paths as it compacts down solid. It is also useful for filling in trenches around pipes but is too coarse to fill around the electrical conduit. It is used for filling made up of a combination of sand grains and aggregates and is a primary base material. It is a common material used in both residential and commercial construction projects. Its properties of excellent compaction make it the perfect base material for several purposes during the construction of a building. It provides a lot of advantages when used in wet areas to fix drainage problems by serving as backfill around septic tanks.",
      },
      {
        name: "Coarse Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/Coarse-Sand.jpg",
        description:
          "Coarse Sand is ideal for bedding pipes and septic systems, as a base material for concrete slabs or concrete pavers, as traction sand for roads and sidewalks, and mixing with topsoil and mulch to create a top dressing material for planting lawns. It can easily be mixed with water, aggregate and even cement to form large concrete structures.",
      },
      {
        name: "Utility Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/Utility-Sand.jpg",
        description:
          "This type of sand is produced from industrial quartz of high quality. This type of construction sand provides excellent compaction and good mechanical properties due to its uniform grain shapes. It can be used in corrosive environments since they are non-reactive. Its excellent quality of compaction and better mechanical features make it a branded construction material. It can also be used in corrosive environments as they do not easily react. The presence of 100% natural minerals in its uniformed grain shape provides long-lasting stability and durability to the building.",
      },
      {
        name: "Pit Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/pit-river-sand.jpg",
        description:
          "It is a natural and coarse type of sand that is extracted by digging 2-3m underneath the ground. It’s red-orange due to the presence of iron oxide around the grains. Usually found, 2-3 metres underground, pet sand is a core sand type that is obtained naturally from deep pits. The outstanding binding properties of these sand grains are due to the absence of salts and their non-reactive nature with the atmospheric moisture. The grains are sharp, angular, rough and coarse appearing “red-orange” for the presence of iron oxide in it. They appear in red-orange due to the presence of iron oxide. The grains of these construction sands are free from salts and hence they don’t easily react with the moisture present in the atmosphere. Due to this property, they provide a strong and rigid building.",
      },
      {
        name: "Fine Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/fine-sand.jpg",
        description:
          "It is a naturally occurring material with a nominal size of fewer than 5 millimeters with a high percentage of fines on the 75 micron sieve. It is used in plastering walls that offer a top-notch finish to each corner of a house internally is fine sand. It’s fine particles make the walls smoother and stronger from the core. As a result, it holds wall colours more prominently for years. However, fine sand is used with coarse sand to make the walls more concrete and withstand heavy building structures.",
      },
      {
        name: "River Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/river-sand.png",
        description:
          "It falls under the fine quality of construction sands which are found near river banks and streams. This sand is white-gray and is one of the fine-graded sands used in the construction of buildings. They are mainly used in concrete and masonry work. They can also be used for RCC, plastering, and many other brick or block works. This sand consists of a smoother texture and a better shape of grains. The river or natural sand demands very less water. River sand since naturally obtained is cheaper.",
      },
      {
        name: "Manufactured Sand",
        image:
          "https://www.constrofacilitator.com/wp-content/uploads/2022/05/manufactured-sand.jpg",
        description:
          "It is artificial sand produced from crushing hard stones into small sand-sized angular-shaped particles, washed and finely graded to be used as construction aggregate. The sand obtained through this process is further refined by removing fine particles and impurities through sieving and washing.",
      },
      {
        name: "Gravel",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Gravel_on_a_beach_in_Thirasia%2C_Santorini%2C_Greece.jpg/600px-Gravel_on_a_beach_in_Thirasia%2C_Santorini%2C_Greece.jpg",
        description:
          "Gravel is a loose aggregation of rock fragments. Gravel occurs naturally throughout the world as a result of sedimentary and erosive geologic processes; it is also produced in large quantities commercially as crushed stone.",
      },
    ],
  },
  {
    name: "Rebar",
    imageUrl:
      "https://images.unsplash.com/photo-1530863506128-dc9eb5c3e0fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNvbnN0cnVjdGlvbiUyMHN0ZWVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Plumbing",
    imageUrl:
      "https://img.freepik.com/free-photo/piping-with-taps_169016-5374.jpg?w=1800&t=st=1665420609~exp=1665421209~hmac=49efc5ba6af804c8dfbc9fa3e7d987506fe9ca9d17128c0cfd6d929295662f26",
  },
  {
    name: "Doors/Gates",
    imageUrl:
      "https://images.unsplash.com/photo-1601084213767-04a4dba01dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fHJvb20lMjBkb29yc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
  },
];
const material = [
  [
    { label: "Stone Work", value: "stonework", disabled: "disabled" },
    {
      label: "Ashlar",
      value: { name: "Ashlar", parent: "Stone Work" },
      parent: "stonework",
    },
    {
      label: "Rubble",
      value: { name: "Rubble", parent: "Stone Work" },
      parent: "stonework",
    },

    { label: "Brick", value: "brick", disabled: "disabled" },
    {
      label: "Extruded",
      value: { name: "Extruded", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Moulded",
      value: { name: "Moulded", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Dry-pressesd",
      value: { name: "Dry-pressesd", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Common",
      value: { name: "Common", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Face",
      value: { name: "Face", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Hollow",
      value: { name: "Hollow", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Paving",
      value: { name: "Paving", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Keyed",
      value: { name: "Keyed", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Clinker",
      value: { name: "Clinker", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Ceramic-glazed ",
      value: { name: "Ceramic-glazed ", parent: "Brick" },
      parent: "brick",
    },
    {
      label: "Chemically-resistant",
      value: { name: "Chemically-resistant", parent: "Brick" },
      parent: "brick",
    },

    { label: "Concrete-Block", value: "Concrete-Block" },
    { label: "Veener", value: "Veener" },
    { label: "Gabions", value: "Gabions" },
  ],
  [
    { label: "Mortar", value: "mortar", disabled: "disabled" },
    {
      label: "Portland cement",
      value: { name: "Portland cement", parent: "Mortar" },
      parent: "mortar",
    },
    {
      label: "Polymer cement",
      value: { name: "Polymer cement", parent: "Mortar" },
      parent: "mortar",
    },
    {
      label: "Lime mortar",
      value: { name: "Lime mortar", parent: "Mortar" },
      parent: "mortar",
    },
    {
      label: "Pozzolanic mortar",
      value: { name: "Pozzolanic mortar", parent: "Mortar" },
      parent: "mortar",
    },
    { label: "Aggregate", value: "aggregate", disabled: "disabled" },
    {
      label: "Concrete Sand",
      value: { name: "Concrete Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Fill Sand",
      value: { name: "Fill Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Coarse Sand",
      value: { name: "Coarse Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Utility Sand",
      value: { name: "Utility Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Pit Sand",
      value: { name: "Pit Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Fine Sand",
      value: { name: "Fine Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "River Sand",
      value: { name: "River Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Manufactured Sand",
      value: { name: "Manufactured Sand", parent: "aggregate" },
      parent: "aggregate",
    },
    {
      label: "Gravel",
      value: { name: "Gravel", parent: "aggregate" },
      parent: "aggregate",
    },
    { label: "Cement", value: "cement", disabled: "disabled" },
    {
      label: "Bestway",
      value: { name: "Bestway", parent: "cement" },
      parent: "cement",
    },
    {
      label: "Fauji",
      value: { name: "Fauji", parent: "cement" },
      parent: "cement",
    },
    {
      label: "Dewan",
      value: { name: "Dewan", parent: "cement" },
      parent: "cement",
    },
    {
      label: "Lakki",
      value: { name: "Lakki", parent: "cement" },
      parent: "cement",
    },
    {
      label: "Poineer",
      value: { name: "Poineer", parent: "cement" },
      parent: "cement",
    },
    {
      label: "D.G khan",
      value: { name: "D.G khan", parent: "cement" },
      parent: "cement",
    },
  ],
  [
    { label: "Amreli Steel", value: "Amreli Steel" },
    { label: "Itehad Steel", value: "Itehad Steel" },
    { label: "Agha Steel", value: "Agha Steel" },
    { label: "Model Steel", value: "Model Steel" },
    { label: "Mughal Steel", value: "Mughal Steel" },
  ],
  [
    { label: "Water pipes", value: "Water pipes", disabled: "disabled" },
    {
      label: "PVC pipes",
      value: { name: "PVC pipes", parent: "Water pipes" },
      parent: "Water pipes",
    },
    {
      label: "Galvanized Iron Pipes",
      value: { name: "Galvanized Iron Pipes", parent: "Water pipes" },
      parent: "Water pipes",
    },
    {
      label: "Lead Pipes",
      value: { name: "Lead Pipes", parent: "Water pipes" },
      parent: "Water pipes",
    },
    {
      label: "Copper Pipes",
      value: { name: "Copper Pipes", parent: "Water pipes" },
      parent: "Water pipes",
    },
    { label: "Drainage pipes", value: "Drainage pipes", disabled: "disabled" },
    {
      label: "Anti-Siphonage Pipes",
      value: { name: "Anti-Siphonage Pipes", parent: "Drainage pipes" },
      parent: "Drainage pipes",
    },
    {
      label: "Vent pipes",
      value: { name: "Vent pipes", parent: "Drainage pipes" },
      parent: "Drainage pipes",
    },
    {
      label: "Soil pipes and waste pipes",
      value: { name: "Soil pipes and waste pipes", parent: "Drainage pipes" },
      parent: "Drainage pipes",
    },
    {
      label: "Rainwater pipes",
      value: { name: "Rainwater pipes", parent: "Drainage pipes" },
      parent: "Drainage pipes",
    },
  ],
  [
    { label: "Gate", value: "gate", disabled: "disabled" },
    {
      label: "Gate1",
      value: { name: "Gate1", parent: "Gate" },
      parent: "gate",
    },

    { label: "Room Doors", value: "roomDoors", disabled: "disabled" },
    {
      label: "Door2",
      value: { name: "Door2", parent: "Room Doors" },
      parent: "roomDoors",
    },

    { label: "Washroom Doors", value: "washroomDoors", disabled: "disabled" },
    {
      label: "Door3",
      value: { name: "Door3", parent: "Washroom Doors" },
      parent: "washroomDoors",
    },
    {
      label: "Door4",
      value: { name: "Door4", parent: "Washroom Doors" },
      parent: "washroomDoors",
    },
  ],
];

const MaterialScreen = ({ navigation, route }) => {
  const [allValues, setAllValues] = useState([]);
  const [keysValues, setKeysValues] = useState([]);
  const [imagesUris, setImagesUris] = useState([]);

  const [index, setIndex] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(allValues[0]);
  const [items, setItems] = useState(material[0]);

  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const setDefaults = () => {
    let allValues2 = _.cloneDeep(allValues);
    let keysValues2 = _.cloneDeep(keysValues);
    let imagesUris2 = _.cloneDeep(imagesUris);
    allValues2 = [[], [], [], [], []];
    keysValues2 = [undefined, undefined, undefined, undefined, undefined];
    imagesUris2 = [undefined, undefined, undefined, undefined, undefined];
    setAllValues(allValues2);
    setKeysValues(keysValues2);
    setImagesUris(imagesUris2);
  };
  useEffect(() => {
    setDefaults();
  }, []);

  const handleCurrentItem = (index) => {
    setIndex(index);
    setValue(allValues[index]);
    setItems(material[index]);
  };

  const handleValueChange = (value) => {
    // if (_.isEqual(value, allValues[index])) return;

    // if the new value length >=1 or previous value was not zero
    if (value.length >= 1 || allValues[index].length >= 1) {
      const currentAllValues = [...allValues];
      let currentValue = [...currentAllValues[index]];
      currentValue = value;
      currentAllValues[index] = currentValue;
      setAllValues(currentAllValues);

      //we need to pass the current all values. Otherwise in the keysValueChange()
      //if we do if(allValues[index].length>0), allValues refers to previous state
      // The reason is because the function was registered/declared with the previous "allValues"
      handleKeysValuesChange(currentAllValues);
    }
  };

  const handleKeysValuesChange = (currentAllValues) => {
    let keysValues2 = _.cloneDeep(keysValues);
    let keyValue = keysValues2[index];
    if (currentAllValues[index].length > 0) keyValue = keys[index].name;
    else keyValue = undefined;
    keysValues2[index] = keyValue;
    setKeysValues(keysValues2);
  };

  useEffect(() => {
    /* this hook will get called everytime when allValues has changed
    perform some action which will get fired everytime when myArr gets updated

    We had to do this becasue setAllvalues() in handleValueChange() was not causing re-render
    The callback method also did not work (it probably would have worked in class components)

    This is because
    Calling setState() in React is asynchronous, for various reasons (mainly performance).
    Under the covers React will batch multiple calls to setState() into a single state mutation,
    and then re-render the component a single time, rather than re-rendering for every state change.
    */
    // console.log("All Values ----------------- \n", allValues);
    // console.log("Updated State ----------------- \n", keysValues);
    // setCount((prevCount) => prevCount + 1);
  });

  return (
    <View>
      <Header navigation={navigation} translateX={translateX} />
      <Tagline heading="Choose Materials" />
      <View>
        <Carousel
          loop
          width={width}
          height={width / 1.3}
          mode="parallax"
          pagingEnabled
          data={keys}
          scrollAnimationDuration={700}
          onSnapToItem={handleCurrentItem}
          renderItem={({ index }) => (
            <Card
              cardStyle={styles.cardStyle}
              imageUrl={keys[index].imageUrl}
              imageStyle={styles.imageStyle}
              title={keys[index].name}
              contentStyle={{ alignItems: "center" }}
              IconComponent={
                <TouchableOpacity
                  onPress={() => setDetailsVisible(!detailsVisible)}
                >
                  <Icon
                    family="mci"
                    name="details"
                    backgroundColor="#fff"
                    iconColor="black"
                    size={52}
                  />
                </TouchableOpacity>
              }
            />
          )}
        />
        <Pagination
          curPage={index}
          maxPage={keys.length}
          style={{ bottom: 20 }}
        />
      </View>

      <View style={[styles.row, shadow]}>
        <DropDownPicker
          badgeDotColors={badgeDotColors}
          items={items}
          itemKey="label"
          dropDownContainerStyle={styles.dropDownContainerStyle}
          listItemLabelStyle={styles.itemLabel}
          mode="BADGE"
          multiple={true}
          open={open}
          onChangeValue={handleValueChange}
          placeholderStyle={styles.placeholderStyle}
          listParentLabelStyle={{
            fontWeight: "bold",
          }}
          maxHeight={170}
          placeholder="Select the item(s)"
          setValue={setValue}
          value={value}
          setOpen={setOpen}
          setItems={setItems}
          style={styles.dropDownPicker}
          theme="DARK"
          TickIconComponent={({ style }) => (
            <Icon
              backgroundColor={colors.medium}
              name="check"
              family="mci"
              size={20}
              style={{ marginRight: 9.5 }}
            />
          )}
          ArrowDownIconComponent={() => (
            <Icon
              backgroundColor={colors.silver}
              name="chevron-down"
              family="mci"
              iconColor={colors.medium}
              size={42}
            />
          )}
          ArrowUpIconComponent={() => (
            <Icon
              backgroundColor={colors.silver}
              name="chevron-up"
              family="mci"
              iconColor="black"
              size={42}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", top: height * 0.27 }}
        onPress={() =>
          navigation.navigate(routes.SPECIFICATIONS, {
            allValues,
            imagesUris,
            keysValues,
          })
        }
      >
        <Icon
          family="mci"
          name="check"
          size={45}
          backgroundColor={colors.primary}
        />
      </TouchableOpacity>
      <MaterialDetails
        modalVisible={detailsVisible}
        onModalVisible={() => setDetailsVisible(!detailsVisible)}
        data={keys[index]}
      />
    </View>
  );
};

export default MaterialScreen;

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    //shadowprops
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 10,
  },

  dropDownPicker: {
    borderWidth: 0,
    backgroundColor: colors.silver,
  },

  dropDownContainerStyle: {
    marginTop: 1,
    backgroundColor: colors.silver,
    borderColor: colors.silver,
    borderTopColor: colors.medium,
    borderTopWidth: 0.2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemLabel: {
    color: colors.medium,
  },
  placeholderStyle: {
    color: colors.medium,
    alignSelf: "center",
  },
  row: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
});

//data={[...new Array(6).keys()]}

// we should not call setValue inside handleValueChange() here because that is then causing infinite loop
// setValue(allValues[index]);
