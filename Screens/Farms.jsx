import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/customButtons/CustomButton";
import {
	REACT_APP_AGWA_CATEGORIES,
	REACT_APP_AGWA_PLANTS,
} from "../utils/database";
import { add_categories } from "../Store/Actions/categories";
import { add_plants } from "../Store/Actions/plants";
import axios from "axios";
import Colors from "../utils/styles";

const Farms = (props) => {
	const { navigation } = props;

	const [isLoading, setIsLoading] = useState(true);
	const categories = useSelector((state) => state.categories.allCategories);
	const plants = useSelector((state) => state.plants.plants);
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const goToFarmAHandler = () => {
		navigation.navigate("farm", {
			farm: "farmA",
		});
	};

	const goToFarmBHandler = () => {
		navigation.navigate("farm", {
			farm: "farmB",
		});
	};
	//Gets the categories from plant DB
	useEffect(() => {
		const getCategories = async () => {
			try {
				const res = await axios.get(`${REACT_APP_AGWA_CATEGORIES}`);

				dispatch(add_categories(res.data.categories));
			} catch (err) {
				console.log(err);
			}
		};

		getCategories();
	}, []);
	//Gets all the plant info of the categories
	useEffect(() => {
		const getPlantData = async () => {
			try {
				const allPlantData = await axios.get(`${REACT_APP_AGWA_PLANTS}`);

				let dataToStore = {};

				for (let i = 0; i < categories.length; i++) {
					let plantsArray = categories[i].plants;

					for (let j = 0; j < plantsArray.length; j++) {
						const foundPlant = allPlantData.data.plants.find(
							(item) => item.id === plantsArray[j].id
						);
						if (foundPlant) {
							dataToStore[plantsArray[j].id] = foundPlant;
						}
					}
				}
				dispatch(add_plants(dataToStore));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};

		if (categories) {
			getPlantData();
		}
	}, [categories]);
	//
	// useEffect(() => {
	// 	const getUserDataFromDB=async()=>{
	// 		let url=`https://plantostore-33e3d-default-rtdb.europe-west1.firebasedatabase.app/users/${user.firebaseUserId}`
	// 		let config=''
	// 		 const result=await axios.get(url,config)

	// 			if(result.data){
	// 				//we have the data
	// 			}
	// 			saveLocalStorageData()
	// 		try{

	// 		}catch(err){
	// 			console.log(err)
	// 		}
	// 	}

	// 	getUserDataFromDB()

	// }, [plants]);
	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator
					style={styles.loader}
					size='large'
					color={Colors.primary}
				/>
			) : (
				<>
					<View stlye={styles.textContainer}>
						<Text style={styles.text}>Select your farm:</Text>
					</View>
					<View style={styles.buttonsContainer}>
						<View style={styles.buttonContainer}>
							<CustomButton
								title='Farm A'
								pressHandler={goToFarmAHandler}
								isImage={true}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<CustomButton
								title='Farm B'
								pressHandler={goToFarmBHandler}
								isImage={true}
							/>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "white",
	},
	buttonContainer: {
		height: 68,
		marginVertical: 28,
	},
	text: {
		color: Colors.textColor,
		fontSize: 24,
		marginVertical: 20,
	},
	textContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		height: "10%",
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		height: "90%",
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Farms;
