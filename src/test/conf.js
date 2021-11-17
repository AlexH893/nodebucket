exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:12345/wd/hub",
  capabilities: {
    browserName: "firefox",
    shardTestFiles: true,
    maxInstances: 2,
  },
  specs: ["moveTask.js"],
};
