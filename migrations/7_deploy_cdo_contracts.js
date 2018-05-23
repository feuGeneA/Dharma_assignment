module.exports = (deployer) => {
    const CDOFactory = artifacts.require("CDOFactory");
    const TrancheToken = artifacts.require("TrancheToken");

    deployer.deploy(CDOFactory);
    deployer.deploy(TrancheToken);
};
