import { useRef, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
const useIsOnline = () => {
	const isOnlineRef = useRef(true);
	const [isOnline, setIsOnline] = useState(isOnlineRef.current);
	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			const online = !!state.isConnected;
			isOnlineRef.current = online;
			setIsOnline((state) => {
				if (state != isOnlineRef.current) return isOnlineRef.current;
			});
		});

		return () => unsubscribe();
	}, []);

	return isOnline;
};
export default useIsOnline;
