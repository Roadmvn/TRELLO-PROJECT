import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6e6e6",
    alignSelf: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    borderColor: "#555",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  boardContainer: {
    backgroundColor: "#dcdcdc",
    padding: 20,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
  },
  boardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  boardText: {
    fontSize: 18,
    color: "#222",
  },
  detailsText: {
    marginTop: 20,
    fontSize: 16,
    color: "#222",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "60%",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    width: "100%",
    borderColor: "#555",
    borderWidth: 1,
    padding: 10,
  },
  listText: {
    fontSize: 14,
    color: "#004499",
    padding: 4,
  },
  modalInput: {
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
  workspaceContainer: {
    marginTop: 20,
    width: "100%",
  },
  workspaceItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
  },
  workspaceText: {
    fontSize: 18,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "#0055cc",
  },
  buttonText: {
    color: "#fff",
  },
});
