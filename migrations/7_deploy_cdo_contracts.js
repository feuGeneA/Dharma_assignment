module.exports = (deployer) => {
    const TrancheToken = artifacts.require("TrancheToken");

    deployer.deploy(TrancheToken);
};
