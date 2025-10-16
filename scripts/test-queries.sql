-- Test queries for enhanced Prisma schema

-- 1. Test new AI agent types
SELECT name, type, accuracy, priority FROM "ai_agents" WHERE type IN ('PRICE_OPTIMIZATION', 'INVENTORY_PREDICTION', 'CUSTOMER_INSIGHT', 'MARKET_ANALYSIS', 'QUALITY_ASSURANCE');

-- 2. Test AI recommendations
SELECT COUNT(*) as total_recommendations FROM "ai_recommendations";

-- 3. Test enhanced certifications
SELECT id, "expiresAt", "certificateUrl", "auditTrail", "smartContract" FROM "certifications" LIMIT 5;

-- 4. Test blockchain transactions
SELECT COUNT(*) as total_blockchain_txs FROM "blockchain_transactions";

-- 5. Test smart contracts
SELECT COUNT(*) as total_smart_contracts FROM "smart_contracts";

-- 6. Test AI agent logs with confidence
SELECT agent_id, confidence, metadata FROM "ai_agent_logs" WHERE confidence IS NOT NULL LIMIT 5;

-- 7. Test relationships - AI agents with recommendations
SELECT a.name as agent_name, COUNT(r.id) as recommendation_count
FROM "ai_agents" a
LEFT JOIN "ai_recommendations" r ON a.id = r.agent_id
GROUP BY a.id, a.name;

-- 8. Test enhanced product with certifications
SELECT p.name, c."halalScore", c."expiresAt", c."auditTrail"
FROM "products" p
JOIN "certifications" c ON p.id = c.product_id
WHERE c."expiresAt" IS NOT NULL;

-- 9. Verify all new enum values are present
SELECT unnest(enum_range(NULL::"AIAgentType")) as ai_agent_types;

-- 10. Test analytics data
SELECT metric, COUNT(*) as records FROM "analytics" GROUP BY metric;
